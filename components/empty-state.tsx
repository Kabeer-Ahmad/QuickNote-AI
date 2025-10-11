import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Plus, Sparkles, Brain, Zap } from 'lucide-react'

interface EmptyStateProps {
  onCreateNote: () => void
}

export function EmptyState({ onCreateNote }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Card className="w-full max-w-lg text-center relative overflow-hidden border shadow-lg bg-background">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-2xl"></div>
        
                <CardContent className="pt-6 pb-6 relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                      </div>
                      <div className="absolute inset-0 h-16 w-16 bg-primary/20 rounded-full blur-lg animate-ping"></div>
                    </div>
                  </div>
          
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Ready to get started?
          </h3>
          <p className="text-muted-foreground mb-8 text-base leading-relaxed">
            Create your first AI-powered note and experience intelligent summarization that helps you understand your content faster.
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
              <Brain className="h-5 w-5 text-primary mb-2" />
              <span className="text-xs font-medium text-foreground">AI Summaries</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10">
              <FileText className="h-5 w-5 text-blue-500 mb-2" />
              <span className="text-xs font-medium text-foreground">Smart Notes</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/10">
              <Zap className="h-5 w-5 text-green-500 mb-2" />
              <span className="text-xs font-medium text-foreground">Lightning Fast</span>
            </div>
          </div>
          
          <Button 
            onClick={onCreateNote} 
            className="w-full h-12 relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl border border-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Plus className="h-5 w-5 mr-2 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
            <span className="relative z-10 font-semibold">Create your first note</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
