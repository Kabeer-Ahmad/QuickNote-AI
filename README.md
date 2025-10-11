# QuickNote AI

A production-ready AI-powered notes web app built with Next.js, Supabase, and multiple AI providers. Create, manage, and summarize your notes with intelligent AI assistance.

## Features

- 🔐 **Secure Authentication** - Email and password authentication
- 📝 **CRUD Operations** - Create, read, update, and delete notes
- 🤖 **AI Summarization** - Support for OpenAI, Google Gemini 2.0 Flash-Lite, and Anthropic Claude
- 🎨 **Modern UI** - Clean, responsive design with dark/light mode
- 📱 **Mobile-First** - Optimized for all device sizes
- ⚡ **Real-time Updates** - Powered by React Query and Supabase
- 🔒 **Row Level Security** - Users only see their own notes

## Tech Stack

- **Framework**: Next.js 15+ (App Router, TypeScript)
- **Styling**: Tailwind CSS with CSS variables
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Query (TanStack Query)
- **Validation**: Zod
- **AI Providers**: OpenAI, Google Gemini 2.0 Flash-Lite, Anthropic Claude
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ and npm/pnpm
- Supabase account
- AI provider API key (OpenAI, Google, or Anthropic)

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd quicknote-ai
pnpm install
```

### 2. Environment Setup

Copy the environment template and fill in your values:

```bash
cp env.template .env.local
```

Edit `.env.local` with your configuration:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Site URL for OAuth redirects
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# AI Provider Configuration
AI_PROVIDER=openai

# OpenAI (Default)
OPENAI_API_KEY="your-openai-api-key"

# Google Gemini (Optional)
GOOGLE_API_KEY="your-google-api-key"
GEMINI_MODEL="gemini-1.5-flash"

# Anthropic Claude (Optional)
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

### 3. Supabase Setup

#### Create a New Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Copy your project URL and anon key to `.env.local`

#### Database Schema
Run this SQL in your Supabase SQL Editor:

```sql
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
```

#### Authentication Setup
1. Go to Authentication → Settings in your Supabase dashboard
2. Set **Site URL** to `http://localhost:3000` (for development)
3. Enable **Email** provider for password authentication
4. Configure email templates if desired (optional)

### 4. AI Provider Setup

#### Google Gemini 2.0 Flash-Lite (Default)
1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env.local` as `GOOGLE_API_KEY`
3. Uses `gemini-2.0-flash-lite` model with thinking disabled for optimal cost efficiency and low latency

#### OpenAI (Optional)
1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to `.env.local` as `OPENAI_API_KEY`
3. Set `AI_PROVIDER=openai`

#### Anthropic Claude (Optional)
1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. Add to `.env.local` as `ANTHROPIC_API_KEY`
3. Set `AI_PROVIDER=anthropic`

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Getting Started
1. Visit the landing page to learn about QuickNote AI features
2. Click "Get Started Free" to create a new account
3. Sign up with your email and password
4. Start creating and managing your AI-powered notes

### Creating Notes
1. Click "New Note" to create a note
2. Add a title and content
3. Use "Generate Summary" to get AI-powered summaries
4. Save and organize your notes

### AI Summarization
- Click "Generate Summary" in the note editor
- AI will create a concise summary with bullet points and TL;DR
- Summaries are saved with your notes
- Works with OpenAI, Gemini, or Claude

### Keyboard Shortcuts
- `Cmd/Ctrl + S` - Save note in editor
- `Escape` - Close dialogs

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain
5. Update Supabase redirect URLs to include your production domain

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL="your-production-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-production-supabase-anon-key"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
AI_PROVIDER="openai"
OPENAI_API_KEY="your-openai-api-key"
```

## Project Structure

```
quicknote-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (landing or notes)
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # App header
│   ├── footer.tsx        # App footer
│   ├── landing-page.tsx  # Landing page component
│   ├── sign-in-card.tsx  # Authentication UI
│   ├── note-card.tsx     # Note display card
│   ├── note-form.tsx     # Note creation/editing
│   ├── note-editor-dialog.tsx # Note editor modal
│   ├── empty-state.tsx   # Empty state component
│   └── conditional-layout.tsx # Conditional header/footer
├── lib/                  # Utility libraries
│   ├── types.ts          # TypeScript types & Zod schemas
│   ├── utils.ts          # Utility functions
│   ├── supabase-browser.ts # Supabase client
│   ├── database.types.ts # Database types
│   └── ai.ts             # AI provider adapter
├── providers/            # React context providers
│   ├── query-provider.tsx # React Query setup
│   └── auth-provider.tsx # Authentication context
└── hooks/                # Custom React hooks
    └── use-toast.ts      # Toast notifications
```

## API Endpoints

### `POST /api/summarize`
Summarize note content using AI.

**Request:**
```json
{
  "content": "Your note content here..."
}
```

**Response:**
```json
{
  "summary": "AI-generated summary..."
}
```

### `GET /api/summarize`
Check AI provider availability.

**Response:**
```json
{
  "available": true,
  "provider": "openai"
}
```

## Customization

### Adding New AI Providers
1. Add provider logic to `lib/ai.ts`
2. Update `AIProvider` type in `lib/types.ts`
3. Add environment variables
4. Update the switch statement in `summarizeText()`

### Styling
- Modify `app/globals.css` for global styles
- Update CSS variables for theming
- Customize components in `components/ui/`

### Database Schema
- Add new tables in Supabase
- Update `lib/database.types.ts`
- Add RLS policies for security

## Troubleshooting

### Common Issues

**"Missing Supabase environment variables"**
- Ensure `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**"Authentication failed"**
- Check Supabase authentication settings
- Verify email provider is enabled in Supabase dashboard
- Ensure password meets minimum requirements (6+ characters)

**"AI summarization not working"**
- Verify API key is set for your chosen provider
- Check `AI_PROVIDER` environment variable
- Ensure content is at least 20 characters

**"Notes not loading"**
- Check RLS policies are correctly set up
- Verify user is authenticated
- Check browser console for errors

### Development Tips

- Use React Query DevTools in development
- Check Supabase logs for database issues
- Monitor network tab for API errors
- Use TypeScript strict mode for better error catching

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Check the troubleshooting section
- Open an issue on GitHub
- Review Supabase and AI provider documentation