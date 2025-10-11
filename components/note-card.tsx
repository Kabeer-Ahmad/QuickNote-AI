'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatRelativeTime, generatePreview } from '@/lib/utils'
import type { Note } from '@/lib/types'
import { Clock, Brain, Sparkles } from 'lucide-react'

interface NoteCardProps {
  note: Note
  onClick: () => void
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  const preview = generatePreview(note.content)
  const hasSummary = note.summary && note.summary.trim().length > 0

  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden border-0 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm"
      onClick={onClick}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm sm:text-base line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300 flex-1">
            {note.title || 'Untitled Note'}
          </CardTitle>
          {hasSummary && (
            <Badge variant="secondary" className="shrink-0 bg-gradient-to-r from-green-500/10 to-green-500/5 text-green-600 border-green-500/20 text-xs">
              <Brain className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">AI</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 relative z-10">
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 group-hover:text-foreground/80 transition-colors duration-300">
          {preview}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
            <Clock className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">{formatRelativeTime(note.updated_at)}</span>
            <span className="sm:hidden">{formatRelativeTime(note.updated_at).split(' ')[0]}</span>
          </div>
          {hasSummary && (
            <div className="flex items-center text-xs text-green-600">
              <Sparkles className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Enhanced</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
