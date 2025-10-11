import { Heart, Sparkles, Database, Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">QuickNote AI</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered note-taking made simple. Create, organize, and summarize your thoughts with intelligent assistance.
            </p>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Sparkles className="h-3 w-3" />
                <span>AI Summarization</span>
              </li>
              <li className="flex items-center space-x-2">
                <Database className="h-3 w-3" />
                <span>Secure Storage</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="h-3 w-3" />
                <span>Privacy First</span>
              </li>
            </ul>
          </div>

          {/* Tech Stack Section */}
          <div className="space-y-4">
            <h4 className="font-medium">Built With</h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'Supabase', 'Tailwind', 'TypeScript'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 QuickNote AI. Made with{' '}
              <Heart className="inline h-3 w-3 text-red-500" /> for productivity.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>v0.1.0</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
