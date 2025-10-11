'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Sparkles, 
  FileText, 
  Brain, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Clock
} from 'lucide-react'
// import Link from 'next/link'

export function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Summaries",
      description: "Get intelligent summaries of your notes with bullet points and TL;DR sections.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Smart Organization",
      description: "Create, edit, and organize your notes with a clean, intuitive interface.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your notes are encrypted and stored securely with row-level security.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Built with Next.js and Supabase for blazing fast performance.",
      color: "from-orange-500 to-red-500"
    }
  ]

  const benefits = [
    "Create unlimited notes",
    "AI-powered summarization",
    "Dark/light mode support",
    "Mobile-first design",
    "Real-time synchronization",
    "Secure authentication"
  ]

  const stats = [
    { icon: <Users className="h-5 w-5" />, value: "10K+", label: "Active Users" },
    { icon: <FileText className="h-5 w-5" />, value: "1M+", label: "Notes Created" },
    { icon: <Brain className="h-5 w-5" />, value: "500K+", label: "AI Summaries" },
    { icon: <Star className="h-5 w-5" />, value: "4.9/5", label: "User Rating" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="container py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-left lg:text-left">
            <div className={`mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-muted-foreground bg-clip-text text-transparent animate-gradient">
                QuickNote AI
              </h1>
            </div>
            
            <div className={`mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
                <span className="text-primary font-bold">Transform your thoughts</span> into organized, AI-powered notes. <span className="text-primary font-bold">Create, summarize, and manage</span> your ideas with intelligent assistance.
              </p>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="group relative p-6 rounded-xl bg-gradient-to-br from-orange-500/5 to-transparent hover:from-blue-500/10 hover:to-blue-500/5 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-sm text-muted-foreground">Intelligent summaries in seconds</span>
                  </div>
                </div>
                
                <div className="group relative p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent hover:from-blue-500/10 hover:to-blue-500/5 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-sm text-muted-foreground">Instant team collaboration</span>
                  </div>
                </div>
                
                <div className="group relative p-6 rounded-xl bg-gradient-to-br from-green-500/5 to-transparent hover:from-green-500/10 hover:to-green-500/5 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse group-hover:animate-ping" style={{ animationDelay: '0.4s' }}></div>
                    <span className="text-sm text-muted-foreground">Enterprise-grade security</span>
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group">
                  <Users className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold text-foreground">10K+</span>
                  <span className="text-muted-foreground">Users</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/5 to-transparent hover:from-green-500/10 hover:to-green-500/5 transition-all duration-300 group">
                  <Shield className="h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold text-foreground">100%</span>
                  <span className="text-muted-foreground">Secure</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500/5 to-transparent hover:from-yellow-500/10 hover:to-yellow-500/5 transition-all duration-300 group">
                  <Star className="h-4 w-4 text-yellow-500 group-hover:scale-110 transition-transform fill-current" />
                  <span className="text-lg font-semibold text-foreground">4.9/5</span>
                  <span className="text-muted-foreground">Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
              
              {/* Main Demo Card */}
              <Card className="p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                      <span className="text-xs text-muted-foreground">AI Active</span>
                    </div>
                  </div>

                  {/* Note Content */}
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded-lg w-3/4 group-hover:w-full transition-all duration-500 flex items-center px-3">
                  <span className="text-xs text-muted-foreground font-medium">Meeting Notes - Q1 Planning</span>
                </div>
                <div className="space-y-2">
                  <div className="h-12 bg-muted rounded-md w-full group-hover:bg-primary/20 transition-all duration-500 flex items-start px-2 py-1">
                    <span className="text-xs text-muted-foreground leading-relaxed">We discussed the new product roadmap for 2025, focusing on budget allocation for AI features and comprehensive team expansion plans to support our growth objectives.</span>
                  </div>
                </div>
                  </div>

                  {/* AI Summary Section */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">AI Summary</span>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Live</span>
                    </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gradient-to-r from-primary/20 to-primary/5 rounded w-full flex items-center px-2">
                        <span className="text-xs text-muted-foreground">• Product roadmap for 2025</span>
                      </div>
                      <div className="h-3 bg-gradient-to-r from-primary/20 to-primary/5 rounded w-4/5 flex items-center px-2">
                        <span className="text-xs text-muted-foreground">• AI features budget allocation</span>
                      </div>
                      <div className="h-3 bg-gradient-to-r from-primary/20 to-primary/5 rounded w-3/5 flex items-center px-2">
                        <span className="text-xs text-muted-foreground">• Team expansion plans</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 bg-primary/20 rounded-md w-16 group-hover:bg-primary/30 transition-all duration-300 flex items-center justify-center">
                      <span className="text-xs text-primary font-medium">Save</span>
                    </div>
                    <div className="h-8 bg-muted rounded-md w-20 group-hover:bg-muted-foreground/20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Share</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-6 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border hover:shadow-lg transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${800 + index * 100}ms` }}
            >
              <div className="flex justify-center mb-2 text-primary">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Everything you need for smart note-taking
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Powerful features designed to enhance your productivity and help you capture ideas more effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`text-center hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full transition-all duration-500 group-hover:scale-110 ${hoveredFeature === index ? `bg-gradient-to-r ${feature.color} text-white shadow-lg` : 'bg-primary/10 text-primary'}`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why choose QuickNote AI?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Experience the future of note-taking with AI-powered features that help you 
              capture, organize, and understand your ideas better than ever before.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 hover:translate-x-2 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 animate-pulse" />
                  <span className="text-sm hover:text-foreground transition-colors">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4 group-hover:w-full transition-all duration-500 flex items-center px-3">
                    <span className="text-xs text-muted-foreground font-medium">Research Notes - AI Trends 2025</span>
                  </div>
                  <div className="h-12 bg-muted rounded-md w-full group-hover:bg-primary/20 transition-all duration-500 flex items-start px-2 py-1">
                    <span className="text-xs text-muted-foreground leading-relaxed">Recent developments in machine learning and natural language processing are driving significant industry applications across healthcare, finance, and technology sectors, with 2025 expected to bring breakthrough innovations.</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="text-sm font-medium">AI Summary</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-primary/20 rounded w-full group-hover:bg-primary/30 transition-all duration-500 flex items-center px-2">
                      <span className="text-xs text-muted-foreground">• ML and NLP advancements</span>
                    </div>
                    <div className="h-3 bg-primary/20 rounded w-4/5 group-hover:w-full group-hover:bg-primary/30 transition-all duration-500 delay-100 flex items-center px-2">
                      <span className="text-xs text-muted-foreground">• Industry applications growth</span>
                    </div>
                    <div className="h-3 bg-primary/20 rounded w-3/5 group-hover:w-4/5 group-hover:bg-primary/30 transition-all duration-500 delay-200 flex items-center px-2">
                      <span className="text-xs text-muted-foreground">• 2025 breakthrough innovations</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12 px-4">
        <Card className={`text-center p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Ready to transform your note-taking?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Experience the power of AI-driven note organization. Create, summarize, and manage your ideas with intelligent assistance that adapts to your workflow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI Summarization</h3>
              <p className="text-sm text-muted-foreground">Get instant summaries with bullet points and TL;DR</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Built for speed with real-time synchronization</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">Your data is encrypted and protected</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Join thousands of users who are already using AI to enhance their productivity
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Real-time Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-glow"
          size="icon"
        >
          <ArrowRight className="h-5 w-5 rotate-[-90deg]" />
        </Button>
      )}
    </div>
  )
}
