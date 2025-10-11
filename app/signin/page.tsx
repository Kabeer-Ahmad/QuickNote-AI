'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/providers/auth-provider'
import { useToast } from '@/hooks/use-toast'
import { isValidEmail } from '@/lib/utils'
import { LogIn, ArrowLeft, Eye, EyeOff, Mail, Lock, Brain, FileText, Shield } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { signIn } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !isValidEmail(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      })
      return
    }

    if (!password || password.length < 6) {
      toast({
        title: 'Invalid password',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        toast({
          title: 'Sign in failed',
          description: error.message || 'Invalid email or password.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You have been signed in successfully.',
        })
        router.push('/')
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Back to Home Link */}
      <div className="absolute top-4 left-4 z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen mt-0">
        {/* Left Side - Information */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 lg:p-8 flex-col justify-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-md mx-auto mt-0">
            <div className="text-center mb-6 mt-0">
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-primary/80 bg-clip-text text-transparent mb-3 leading-tight">
                Welcome back!
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Continue your journey with AI-powered note-taking. Access your intelligent summaries and organized thoughts.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              <div className="group p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">AI Summaries</h3>
                    <p className="text-sm text-muted-foreground">Get instant intelligent summaries with bullet points and key insights from your notes.</p>
                  </div>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Smart Organization</h3>
                    <p className="text-sm text-muted-foreground">Keep your notes organized with intelligent categorization and powerful search.</p>
                  </div>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Secure & Private</h3>
                    <p className="text-sm text-muted-foreground">Your notes are encrypted and secure with enterprise-grade protection.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-background/30 backdrop-blur-sm border border-primary/10">
                <div className="text-lg font-bold text-primary">10K+</div>
                <div className="text-xs text-muted-foreground">Users</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/30 backdrop-blur-sm border border-primary/10">
                <div className="text-lg font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground">Secure</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/30 backdrop-blur-sm border border-primary/10">
                <div className="text-lg font-bold text-primary">4.9/5</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex items-center justify-center p-4 lg:p-8 pt-8 lg:pt-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Sign In</h2>
              <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="h-11 border-2 focus:border-primary transition-colors bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    minLength={6}
                    className="h-11 pr-12 border-2 focus:border-primary transition-colors bg-background"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-9 w-9 hover:bg-primary/10"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-primary/90 transition-colors" 
                disabled={isLoading}
              >
                <LogIn className="h-4 w-4 mr-2" />
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link 
                  href="/signup" 
                  className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
