import { z } from 'zod'

// Database types
export interface Note {
  id: string
  user_id: string
  title: string
  content: string
  summary: string
  created_at: string
  updated_at: string
}

// Zod schemas for validation
export const NoteSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  summary: z.string().default(''),
  created_at: z.string(),
  updated_at: z.string(),
})

export const CreateNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  summary: z.string().optional(),
})

export const UpdateNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  summary: z.string().optional(),
})

export const SummarizeRequestSchema = z.object({
  content: z.string().min(20, 'Content must be at least 20 characters to summarize'),
})

// Type exports
export type CreateNoteInput = z.infer<typeof CreateNoteSchema>
export type UpdateNoteInput = z.infer<typeof UpdateNoteSchema>
export type SummarizeRequest = z.infer<typeof SummarizeRequestSchema>

// API Response types
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

export interface SummarizeResponse {
  summary: string
}

// Auth types
export interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

// AI Provider types
export type AIProvider = 'openai' | 'gemini' | 'anthropic'

export interface AIProviderConfig {
  provider: AIProvider
  apiKey: string
  model?: string
}
