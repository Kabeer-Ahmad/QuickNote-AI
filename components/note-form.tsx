'use client'

import { useState, useEffect, forwardRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RichTextEditor } from '@/components/rich-text-editor'
import { useToast } from '@/hooks/use-toast'
import { CreateNoteSchema, UpdateNoteSchema } from '@/lib/types'
import type { Note, CreateNoteInput, UpdateNoteInput } from '@/lib/types'
import { Sparkles } from 'lucide-react'

interface NoteFormProps {
  note?: Note
  onSubmit: (data: CreateNoteInput | UpdateNoteInput) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
  showSummary?: boolean
  onSummarize?: (content: string) => Promise<void>
  isSummarizing?: boolean
  isTwoPanel?: boolean
  onContentChange?: (content: string) => void
  currentSummary?: string
}

export const NoteForm = forwardRef<HTMLFormElement, NoteFormProps>(({ 
  note, 
  onSubmit, 
  onCancel, 
  isLoading = false,
  showSummary = false,
  onSummarize,
  isSummarizing = false,
  isTwoPanel = false,
  onContentChange,
  currentSummary
}, ref) => {
  const { toast } = useToast()
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [summary, setSummary] = useState(note?.summary || '')

  // Update form when note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setSummary(note.summary)
    } else {
      setTitle('')
      setContent('')
      setSummary('')
    }
  }, [note])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validate form data
      const formData = { title, content }
      const validation = note 
        ? UpdateNoteSchema.safeParse(formData)
        : CreateNoteSchema.safeParse(formData)

      if (!validation.success) {
        const firstError = validation.error.errors[0]
        toast({
          title: 'Validation Error',
          description: firstError.message,
          variant: 'destructive',
        })
        return
      }

      // Include summary if it exists (use currentSummary from dialog if available, otherwise use local summary)
      const finalSummary = currentSummary || summary
      const submitData = { 
        ...formData, 
        ...(finalSummary && { summary: finalSummary }) 
      }

      await onSubmit(submitData)
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to save note. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Save with Cmd/Ctrl + S
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form ref={ref} onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6 pb-4">
      <div className="space-y-3">
        <label htmlFor="title" className="text-sm font-semibold text-foreground">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          disabled={isLoading}
          required
          className="h-11 text-base border-2 focus:border-primary transition-colors bg-background"
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="content" className="text-sm font-semibold text-foreground">
          Content
        </label>
        <RichTextEditor
          value={content}
          onChange={(value) => {
            setContent(value)
            onContentChange?.(value)
          }}
          placeholder="Write your note here..."
          disabled={isLoading}
        />
      </div>

      {(showSummary || isTwoPanel) && (
        <div className={`space-y-3 ${isTwoPanel ? 'lg:hidden' : ''}`}>
          <div className="flex items-center justify-between">
            <label htmlFor="summary" className="text-sm font-semibold text-foreground">
              AI Summary
            </label>
            {onSummarize && content.length >= 20 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={async () => {
                  try {
                    await onSummarize(content)
                  } catch {
                    // Error is already handled in the onSummarize function
                  }
                }}
                disabled={isSummarizing || isLoading}
                className="h-9 px-4 border-2 hover:border-primary transition-colors"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="font-medium">
                  {isSummarizing ? 'Generating...' : 'Generate Summary'}
                </span>
              </Button>
            )}
          </div>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="AI-generated summary will appear here..."
            className="min-h-[120px] resize-none text-base border-2 focus:border-primary transition-colors bg-background"
            disabled={isLoading}
          />
        </div>
      )}

      {!isTwoPanel && (
        <div className="flex justify-end space-x-3 pt-4 border-t">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="h-10 px-6 border-2 hover:border-primary transition-colors"
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isLoading}
            className="h-10 px-6 bg-primary hover:bg-primary/90 transition-colors"
          >
            {isLoading ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
          </Button>
        </div>
      )}
    </form>
  )
})

NoteForm.displayName = 'NoteForm'
