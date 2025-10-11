'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LandingPage } from '@/components/landing-page'
import { NoteCard } from '@/components/note-card'
import { NoteEditorDialog } from '@/components/note-editor-dialog'
import { EmptyState } from '@/components/empty-state'
import { useAuth } from '@/providers/auth-provider'
import { listNotes } from '@/lib/supabase-browser'
import { Plus, Search, Grid, List, FileText, Brain, TrendingUp } from 'lucide-react'
import type { Note } from '@/lib/types'

export default function Home() {
  const { user, loading: authLoading } = useAuth()
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Fetch notes if user is authenticated
  const { data: notes, isLoading: notesLoading, error } = useQuery({
    queryKey: ['notes'],
    queryFn: listNotes,
    enabled: !!user,
    select: (result) => result.data || [],
  })

  const handleCreateNote = () => {
    setEditingNote(null)
    setIsEditorOpen(true)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setIsEditorOpen(true)
  }

  const handleCloseEditor = () => {
    setIsEditorOpen(false)
    setEditingNote(null)
  }

  // Filter notes based on search query
  const filteredNotes = notes?.filter(note => 
    note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  // Calculate stats
  const totalNotes = notes?.length || 0
  const notesWithSummary = notes?.filter(note => note.summary && note.summary.trim().length > 0).length || 0

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="space-y-4 w-full max-w-md">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>
        </div>
      </div>
    )
  }

  // Show landing page if not authenticated
  if (!user) {
    return <LandingPage />
  }

  // Show error state
  if (error) {
    return (
      <div className="container py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Error loading notes</h3>
            <p className="text-muted-foreground mb-4">
              {error.message || 'Something went wrong while loading your notes.'}
            </p>
            <Button onClick={() => window.location.reload()}>
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-4 px-4 sm:py-6 sm:px-6">
        {/* Mobile-Optimized Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                My Notes
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                Create and manage your AI-powered notes
              </p>
            </div>
            <Button 
              onClick={handleCreateNote}
              size="sm"
              className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl border border-primary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Plus className="h-4 w-4 mr-2 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative z-10 font-medium">New Note</span>
            </Button>
          </div>

          {/* Mobile-Optimized Stats Cards */}
          {!notesLoading && totalNotes > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
              <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent border-primary/20 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-lg sm:text-xl font-bold text-foreground">{totalNotes}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20 hover:from-green-500/10 hover:to-green-500/5 transition-all duration-300 group">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300">
                      <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-lg sm:text-xl font-bold text-foreground">{notesWithSummary}</p>
                      <p className="text-xs text-muted-foreground">AI</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20 hover:from-blue-500/10 hover:to-blue-500/5 transition-all duration-300 group">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-lg sm:text-xl font-bold text-foreground">
                        {totalNotes > 0 ? Math.round((notesWithSummary / totalNotes) * 100) : 0}%
                      </p>
                      <p className="text-xs text-muted-foreground">Coverage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Mobile-Optimized Search and Filter Bar */}
          {!notesLoading && totalNotes > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-primary transition-all duration-300 bg-background/50 backdrop-blur-sm text-sm"
                />
              </div>
              <div className="flex gap-2 justify-center sm:justify-start">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="transition-all duration-300 h-9 flex-1 sm:flex-none"
                >
                  <Grid className="h-4 w-4 mr-1 sm:mr-0" />
                  <span className="sm:hidden text-xs">Grid</span>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="transition-all duration-300 h-9 flex-1 sm:flex-none"
                >
                  <List className="h-4 w-4 mr-1 sm:mr-0" />
                  <span className="sm:hidden text-xs">List</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Notes Content */}
        {notesLoading ? (
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="relative overflow-hidden">
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-2/3 mb-3" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => handleEditNote(note)}
              />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No notes found</h3>
            <p className="text-muted-foreground mb-4">
              No notes match your search for &quot;{searchQuery}&quot;
            </p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear search
            </Button>
          </div>
        ) : (
          <EmptyState onCreateNote={handleCreateNote} />
        )}

        {/* Note Editor Dialog */}
        <NoteEditorDialog
          note={editingNote || undefined}
          open={isEditorOpen}
          onOpenChange={handleCloseEditor}
        />
      </div>
    </div>
  )
}