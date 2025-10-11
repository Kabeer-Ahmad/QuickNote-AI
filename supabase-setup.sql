-- QuickNote AI Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable pgcrypto for gen_random_uuid if needed
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Notes table with user ownership
CREATE TABLE IF NOT EXISTS public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  summary text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS notes_updated_at ON public.notes;
CREATE TRIGGER notes_updated_at
  BEFORE UPDATE ON public.notes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Useful index for per-user queries
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON public.notes(user_id);

-- Row Level Security (RLS)
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Read own notes
CREATE POLICY "read_own_notes" ON public.notes FOR SELECT
  USING ( auth.uid() = user_id );

-- Insert notes; force user_id to auth.uid()
CREATE POLICY "insert_own_notes" ON public.notes FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- Update own notes
CREATE POLICY "update_own_notes" ON public.notes FOR UPDATE
  USING ( auth.uid() = user_id )
  WITH CHECK ( auth.uid() = user_id );

-- Delete own notes
CREATE POLICY "delete_own_notes" ON public.notes FOR DELETE
  USING ( auth.uid() = user_id );
