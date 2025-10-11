'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { NoteForm } from './note-form'
import { useToast } from '@/hooks/use-toast'
import { createNote, updateNote, deleteNote } from '@/lib/supabase-browser'
import { useQueryClient } from '@tanstack/react-query'
import type { Note, CreateNoteInput, UpdateNoteInput } from '@/lib/types'
import { Trash2, Sparkles } from 'lucide-react'

interface NoteEditorDialogProps {
  note?: Note
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NoteEditorDialog({ note, open, onOpenChange }: NoteEditorDialogProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [currentContent, setCurrentContent] = useState(note?.content || '')
  const [currentSummary, setCurrentSummary] = useState(note?.summary || '')
  const formRef = useRef<HTMLFormElement>(null)

  // Update state when note changes
  useEffect(() => {
    setCurrentContent(note?.content || '')
    setCurrentSummary(note?.summary || '')
  }, [note])

  const handleSubmit = async (data?: CreateNoteInput | UpdateNoteInput) => {
    setIsLoading(true)
    try {
      // Get current form data if not provided
      const formData = data || { 
        title: note?.title || '', 
        content: currentContent, 
        summary: currentSummary 
      }
      
      if (note) {
        // Update existing note
        const { error } = await updateNote(note.id, formData as UpdateNoteInput)
        if (error) throw error
        toast({
          title: 'Note updated',
          description: 'Your note has been updated successfully.',
        })
      } else {
        // Create new note
        const { error } = await createNote(formData as CreateNoteInput)
        if (error) throw error
        toast({
          title: 'Note created',
          description: 'Your note has been created successfully.',
        })
      }

      // Invalidate and refetch notes
      await queryClient.invalidateQueries({ queryKey: ['notes'] })
      onOpenChange(false)
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save note.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSummarize = async (content: string) => {
    setIsSummarizing(true)
    try {
      console.log('Sending content for summarization:', content)
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Summary API error:', response.status, errorData)
        throw new Error(`Failed to generate summary: ${response.status} ${errorData.error || 'Unknown error'}`)
      }

      const { summary } = await response.json()
      
      if (note) {
        // Update existing note with the summary
        const { error } = await updateNote(note.id, { summary })
        if (error) throw error

        toast({
          title: 'Summary generated',
          description: 'AI summary has been added to your note.',
        })

        // Invalidate and refetch notes
        await queryClient.invalidateQueries({ queryKey: ['notes'] })
      } else {
        // For new notes, update the current summary state
        setCurrentSummary(summary)
        toast({
          title: 'Summary generated',
          description: 'AI summary has been generated. You can edit it before saving.',
        })
        
        return summary
      }
    } catch (error: unknown) {
      toast({
        title: 'Summary failed',
        description: error instanceof Error ? error.message : 'Failed to generate summary.',
        variant: 'destructive',
      })
      throw error
    } finally {
      setIsSummarizing(false)
    }
  }

  const handleDelete = async () => {
    if (!note) return

    setIsLoading(true)
    try {
      const { error } = await deleteNote(note.id)
      if (error) throw error

      toast({
        title: 'Note deleted',
        description: 'Your note has been deleted successfully.',
      })

      // Invalidate and refetch notes
      await queryClient.invalidateQueries({ queryKey: ['notes'] })
      onOpenChange(false)
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete note.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden bg-background flex flex-col w-[95vw] sm:w-full h-[95vh] sm:h-auto">
          {/* Header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-background flex-shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-foreground">
              {note ? 'Edit Note' : 'Create New Note'}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
              {note 
                ? 'Make changes to your note. Click save when you\'re done.'
                : 'Create a new note with AI-powered summarization.'
              }
            </DialogDescription>
          </div>

          {/* Mobile: Single panel, Desktop: Two-panel layout */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
              {/* Left Panel - Note Content */}
              <div className="flex-1 flex flex-col lg:border-r bg-background min-h-0">
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-background min-h-0">
                  <NoteForm
                    ref={formRef}
                    note={note}
                    onSubmit={handleSubmit}
                    onCancel={() => onOpenChange(false)}
                    isLoading={isLoading}
                    showSummary={false}
                    onSummarize={handleSummarize}
                    isSummarizing={isSummarizing}
                    isTwoPanel={true}
                    onContentChange={setCurrentContent}
                    currentSummary={currentSummary}
                  />
                </div>
              </div>

              {/* Right Panel - AI Summary (Hidden on mobile, shown on desktop) */}
              <div className="hidden lg:flex w-96 flex-col bg-muted/50">
                <div className="p-6 border-b bg-muted/70">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      AI Summary
                    </h3>
                    {currentContent && currentContent.length >= 20 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSummarize(currentContent)}
                        disabled={isSummarizing || isLoading}
                        className="h-8 px-3 text-xs bg-background border-2"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        {isSummarizing ? 'Generating...' : 'Generate'}
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto bg-muted/50">
                  {currentSummary ? (
                    <div className="space-y-4">
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground bg-background p-4 rounded-lg border">
                          {currentSummary}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-16 h-16 rounded-full bg-background border flex items-center justify-center mb-4">
                        <Sparkles className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h4 className="font-medium text-foreground mb-2">No Summary Yet</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {currentContent && currentContent.length >= 20 
                          ? 'Click "Generate" to create an AI summary'
                          : 'Add more content to generate a summary'
                        }
                      </p>
                      {currentContent && currentContent.length >= 20 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSummarize(currentContent)}
                          disabled={isSummarizing || isLoading}
                          className="bg-background border-2"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Summary
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-background flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 flex-shrink-0">
              <div className="flex items-center gap-3">
                {note && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isLoading}
                    className="h-9"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Note
                  </Button>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                <div className="text-xs text-muted-foreground hidden sm:block">
                  Press Cmd/Ctrl + S to save
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={isLoading}
                    className="h-9 flex-1 sm:flex-none"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => formRef.current?.requestSubmit()}
                    disabled={isLoading}
                    className="h-9 flex-1 sm:flex-none"
                  >
                    {isLoading ? 'Saving...' : note ? 'Update Note' : 'Create Note'}
                  </Button>
                </div>
              </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this note? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
