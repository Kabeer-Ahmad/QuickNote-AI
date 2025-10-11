'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogIn, UserPlus, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function SignInCard() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to QuickNote AI</CardTitle>
          <CardDescription>
            Sign in to access your AI-powered notes or create a new account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button asChild className="w-full h-11">
              <Link href="/signin">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full h-11">
              <Link href="/signup">
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              New to QuickNote AI?{' '}
              <Link 
                href="/signup" 
                className="text-primary hover:underline font-medium inline-flex items-center"
              >
                Get started free
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
