import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenAI } from '@google/genai'
import type { AIProvider } from './types'

/**
 * AI Provider Adapter for text summarization
 * Supports OpenAI, Google Gemini, and Anthropic Claude
 */

const SYSTEM_PROMPT = `You are a concise assistant. Summarize the input in 3–5 bullet points and one 1‑sentence "In Short:" summary. Keep factual, avoid new claims. If the input contains HTML formatting, focus on the text content and ignore formatting tags.`

/**
 * Check if content is too short for summarization
 */
function isContentTooShort(content: string): boolean {
  return content.trim().length < 20
}

/**
 * Strip HTML tags from content for AI processing
 */
function stripHtmlTags(content: string): string {
  return content.replace(/<[^>]*>/g, '').trim()
}

/**
 * Clean and validate the AI response
 */
function cleanResponse(response: string): string {
  return response.trim().replace(/^```[\s\S]*?```$/gm, '').trim()
}

/**
 * Summarize text using OpenAI
 */
async function summarizeWithOpenAI(content: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key not configured')
  }

  const openai = new OpenAI({ apiKey })

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: content }
      ],
      max_tokens: 200,
      temperature: 0.3,
    })

    const summary = completion.choices[0]?.message?.content
    if (!summary) {
      throw new Error('No summary generated')
    }

    return cleanResponse(summary)
  } catch (error) {
    console.error('OpenAI summarization error:', error)
    throw new Error('Failed to generate summary with OpenAI')
  }
}

/**
 * Summarize text using Google Gemini 2.0 Flash-Lite
 */
async function summarizeWithGemini(content: string): Promise<string> {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) {
    throw new Error('Google API key not configured')
  }

  // Use Gemini 2.0 Flash-Lite for optimal cost efficiency and low latency
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash-lite'
  const ai = new GoogleGenAI({ apiKey })

  try {
    const prompt = `${SYSTEM_PROMPT}\n\nContent to summarize:\n${content}`
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 200,
        topP: 0.8,
        topK: 40,
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking for faster responses
        },
      }
    })

    const summary = response.text

    if (!summary) {
      throw new Error('No summary generated')
    }

    return cleanResponse(summary)
  } catch (error) {
    console.error('Gemini 2.0 Flash-Lite summarization error:', error)
    throw new Error('Failed to generate summary with Gemini 2.0 Flash-Lite')
  }
}

/**
 * Summarize text using Anthropic Claude
 */
async function summarizeWithAnthropic(content: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('Anthropic API key not configured')
  }

  const anthropic = new Anthropic({ apiKey })

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 200,
      temperature: 0.3,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: content
        }
      ]
    })

    const summary = message.content[0]
    if (summary.type !== 'text') {
      throw new Error('Unexpected response type from Anthropic')
    }

    return cleanResponse(summary.text)
  } catch (error) {
    console.error('Anthropic summarization error:', error)
    throw new Error('Failed to generate summary with Anthropic')
  }
}

/**
 * Main summarization function that routes to the appropriate provider
 */
export async function summarizeText(content: string): Promise<string> {
  // Strip HTML tags for AI processing
  const cleanContent = stripHtmlTags(content)
  
  // Check if content is too short
  if (isContentTooShort(cleanContent)) {
    return 'Content too short to summarize.'
  }

  const provider = (process.env.AI_PROVIDER || 'openai') as AIProvider

  try {
    switch (provider) {
      case 'openai':
        return await summarizeWithOpenAI(cleanContent)
      case 'gemini':
        return await summarizeWithGemini(cleanContent)
      case 'anthropic':
        return await summarizeWithAnthropic(cleanContent)
      default:
        throw new Error(`Unsupported AI provider: ${provider}`)
    }
  } catch (error) {
    console.error(`Summarization failed with provider ${provider}:`, error)
    
    // Return a fallback message instead of throwing
    return 'Unable to generate summary at this time. Please try again later.'
  }
}

/**
 * Check if AI summarization is available
 */
export function isAIAvailable(): boolean {
  const provider = (process.env.AI_PROVIDER || 'openai') as AIProvider
  
  switch (provider) {
    case 'openai':
      return !!process.env.OPENAI_API_KEY
    case 'gemini':
      return !!process.env.GOOGLE_API_KEY
    case 'anthropic':
      return !!process.env.ANTHROPIC_API_KEY
    default:
      return false
  }
}

/**
 * Get the current AI provider name
 */
export function getCurrentProvider(): AIProvider {
  return (process.env.AI_PROVIDER || 'openai') as AIProvider
}
