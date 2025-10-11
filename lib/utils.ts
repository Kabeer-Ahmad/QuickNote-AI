import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncate text to a specified length with ellipsis
 */
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'MMM d, yyyy')
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

/**
 * Generate a preview of note content
 */
export function generatePreview(content: string, maxLength: number = 150): string {
  // Remove HTML tags and markdown formatting for preview
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  return truncate(cleanContent, maxLength)
}

/**
 * Check if content is too short for summarization
 */
export function isContentTooShort(content: string): boolean {
  return content.trim().length < 20
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get user initials from email or name
 */
export function getUserInitials(user: { email?: string; user_metadata?: { full_name?: string } }): string {
  if (user.user_metadata?.full_name) {
    return user.user_metadata.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  if (user.email) {
    return user.email[0].toUpperCase()
  }
  
  return 'U'
}

/**
 * Debounce function for search and other inputs
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

/**
 * Generate a random ID (for client-side use)
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
