'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/auth-provider'
import { getUserInitials } from '@/lib/utils'
import { 
  Sun, 
  Moon, 
  LogOut, 
  // User,
  Menu,
  X,
  LogIn,
  UserPlus,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

export function Header() {
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isScrolled, setIsScrolled] = useState(false)

  // Effect to set initial theme from system preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Effect to handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setIsMenuOpen(false) // Close menu on sign out
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-sm' 
        : 'bg-background/80 backdrop-blur-sm'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 h-6 w-6 bg-primary/20 rounded-full blur-sm group-hover:bg-primary/30 transition-colors duration-300"></div>
          </div>
          <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            QuickNote AI
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative overflow-hidden group hover:bg-primary/10 transition-all duration-300"
          >
            <div className="relative z-10">
              {theme === 'light' ? (
                <Moon className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              ) : (
                <Sun className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>

          {/* Auth Buttons or User Menu */}
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-medium group-hover:scale-110 transition-transform duration-300">
                  {getUserInitials(user)}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground hover:bg-red-500/10 hover:text-red-600 transition-all duration-300 group"
              >
                <LogOut className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Sign out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button 
                asChild 
                variant="ghost" 
                size="sm" 
                className="relative overflow-hidden group bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 hover:text-blue-700 border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
              >
                <Link href="/signin">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <LogIn className="h-4 w-4 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10 font-medium">Sign In</span>
                </Link>
              </Button>
              <Button 
                asChild 
                size="sm" 
                className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-105 transition-all duration-300 group shadow-lg hover:shadow-xl border border-primary/20"
              >
                <Link href="/signup">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <UserPlus className="h-4 w-4 mr-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10 font-medium">Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="relative overflow-hidden group hover:bg-primary/10 transition-all duration-300"
          >
            <div className="relative z-10">
              {isMenuOpen ? (
                <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden border-t bg-background/95 backdrop-blur-md transition-all duration-300 ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="container py-4 space-y-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            className="w-full justify-start group hover:bg-primary/10 transition-all duration-300"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            ) : (
              <Sun className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            )}
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </Button>

          {/* Auth Buttons or User Info */}
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-medium group-hover:scale-110 transition-transform duration-300">
                  {getUserInitials(user)}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start group hover:bg-red-500/10 hover:text-red-600 transition-all duration-300"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Sign out
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button 
                asChild 
                variant="ghost" 
                className="w-full justify-start group bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 hover:text-blue-700 border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
              >
                <Link href="/signin">
                  <LogIn className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Sign In</span>
                </Link>
              </Button>
              <Button 
                asChild 
                className="w-full justify-start bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-105 transition-all duration-300 group shadow-lg border border-primary/20"
              >
                <Link href="/signup">
                  <UserPlus className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium">Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
