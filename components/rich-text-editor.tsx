'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Underline,
  // Type,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Write your note here...", 
  disabled = false,
  className = ""
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const insertBulletList = () => {
    execCommand('insertUnorderedList')
  }

  const insertNumberedList = () => {
    execCommand('insertOrderedList')
  }

  const insertQuote = () => {
    execCommand('formatBlock', 'blockquote')
  }

  const formatText = (command: string) => {
    execCommand(command)
  }

  const alignText = (alignment: string) => {
    execCommand('justify' + alignment.charAt(0).toUpperCase() + alignment.slice(1))
  }

  const toolbarButtons = [
    {
      icon: Bold,
      command: 'bold',
      label: 'Bold',
      action: () => formatText('bold')
    },
    {
      icon: Italic,
      command: 'italic',
      label: 'Italic',
      action: () => formatText('italic')
    },
    {
      icon: Underline,
      command: 'underline',
      label: 'Underline',
      action: () => formatText('underline')
    },
    {
      icon: List,
      command: 'insertUnorderedList',
      label: 'Bullet List',
      action: insertBulletList
    },
    {
      icon: ListOrdered,
      command: 'insertOrderedList',
      label: 'Numbered List',
      action: insertNumberedList
    },
    {
      icon: Quote,
      command: 'formatBlock',
      label: 'Quote',
      action: insertQuote
    },
    {
      icon: AlignLeft,
      command: 'justifyLeft',
      label: 'Align Left',
      action: () => alignText('left')
    },
    {
      icon: AlignCenter,
      command: 'justifyCenter',
      label: 'Align Center',
      action: () => alignText('center')
    },
    {
      icon: AlignRight,
      command: 'justifyRight',
      label: 'Align Right',
      action: () => alignText('right')
    }
  ]

  return (
    <div className={`border-2 rounded-lg transition-colors ${isFocused ? 'border-primary' : 'border-gray-200 dark:border-gray-700'} ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30">
        {toolbarButtons.map((button) => {
          const Icon = button.icon
          return (
            <Button
              key={button.command}
              type="button"
              variant="ghost"
              size="sm"
              onClick={button.action}
              disabled={disabled}
              className="h-8 w-8 p-0 hover:bg-muted"
              title={button.label}
            >
              <Icon className="h-4 w-4" />
            </Button>
          )
        })}
      </div>
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="min-h-[150px] sm:min-h-[200px] p-4 text-base leading-relaxed focus:outline-none bg-background"
        style={{ minHeight: '150px' }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        [contenteditable] li {
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  )
}
