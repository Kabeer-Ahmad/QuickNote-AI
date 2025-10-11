import { NextRequest, NextResponse } from 'next/server'
import { SummarizeRequestSchema } from '@/lib/types'
import { summarizeText } from '@/lib/ai'

/**
 * POST /api/summarize
 * Summarize note content using AI
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validation = SummarizeRequestSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { content } = validation.data

    // Note: Authentication is handled client-side
    // The API route is public but rate limiting should be implemented in production

    // Generate summary
    const summary = await summarizeText(content)

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Summarization API error:', error)
    
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/summarize
 * Check if AI summarization is available
 */
export async function GET() {
  try {
    const { isAIAvailable, getCurrentProvider } = await import('@/lib/ai')
    
    return NextResponse.json({
      available: isAIAvailable(),
      provider: getCurrentProvider(),
    })
  } catch (error) {
    console.error('AI status check error:', error)
    
    return NextResponse.json(
      { available: false, provider: null },
      { status: 500 }
    )
  }
}
