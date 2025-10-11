import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client for browser usage
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Auth helpers
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Notes CRUD operations
export async function listNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('updated_at', { ascending: false })
  
  return { data, error }
}

export async function getNote(id: string) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}

export async function createNote(note: { title: string; content: string; summary?: string }) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { data: null, error: { message: 'User not authenticated' } }
  }

  const { data, error } = await supabase
    .from('notes')
    .insert({
      title: note.title,
      content: note.content,
      summary: note.summary || '',
      user_id: user.id,
    })
    .select()
    .single()
  
  return { data, error }
}

export async function updateNote(id: string, updates: { title?: string; content?: string; summary?: string }) {
  const { data, error } = await supabase
    .from('notes')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}

export async function deleteNote(id: string) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
  
  return { error }
}

// Get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (event: string, session: unknown) => void) {
  return supabase.auth.onAuthStateChange(callback)
}
