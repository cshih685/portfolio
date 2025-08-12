# Deployment Guide

## Overview

This guide covers deploying the Portfolio Website to Vercel with Supabase as the backend service. The application is optimized for static export with dynamic API routes.

## Prerequisites

### Required Accounts
- **GitHub Account**: For code repository
- **Vercel Account**: For hosting (free tier available)
- **Supabase Account**: For database and storage (free tier available)

### Local Development Setup
```bash
# Node.js version
node --version  # Should be 18.x or higher

# Package manager
npm --version   # or yarn --version
```

## Environment Configuration

### Environment Variables

Create the following environment files:

#### `.env.local` (Development)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=your.email@example.com

# Optional: Email Service (Resend)
RESEND_API_KEY=your_resend_api_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

#### Production Environment Variables (Vercel)
```bash
# Same as above but with production URLs
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_CONTACT_EMAIL=your.email@example.com
```

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Create a new project
5. Choose a region close to your users
6. Set a strong database password

### 2. Database Schema Setup

Execute the following SQL in the Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT,
  introduction TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create resume_sections table
CREATE TABLE resume_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section_type TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create photos table
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  caption TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_resume_sections_profile_id ON resume_sections(profile_id);
CREATE INDEX idx_resume_sections_order ON resume_sections(profile_id, order_index);
CREATE INDEX idx_photos_profile_id ON photos(profile_id);
CREATE INDEX idx_photos_order ON photos(profile_id, order_index);
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (public read access for portfolio)
CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY "Public resume sections are viewable by everyone" 
  ON resume_sections FOR SELECT 
  USING (true);

CREATE POLICY "Public photos are viewable by everyone" 
  ON photos FOR SELECT 
  USING (true);

-- Contact submissions - only allow inserts
CREATE POLICY "Anyone can submit contact forms" 
  ON contact_submissions FOR INSERT 
  WITH CHECK (true);

-- Insert initial profile data
INSERT INTO profiles (name, title, introduction, email, location, social_links) 
VALUES (
  'Your Name',
  'Full-Stack Developer',
  'Passionate full-stack developer with expertise in modern web technologies. I love creating seamless user experiences and robust backend systems.',
  'your.email@example.com',
  'San Francisco, CA',
  '{"github": "https://github.com/yourusername", "linkedin": "https://linkedin.com/in/yourusername"}'
);
```

### 3. Storage Setup

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `portfolio-assets`
3. Set the bucket to public
4. Configure the following policies:

```sql
-- Allow public access to view files
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');

-- Allow authenticated uploads (for future admin features)
CREATE POLICY "Authenticated uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-assets' AND auth.role() = 'authenticated');
```

## Vercel Deployment

### 1. Repository Setup

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/portfolio-website.git
git branch -M main
git push -u origin main
```

### 2. Vercel Project Setup

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts:
# ? Set up and deploy "~/portfolio-website"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? portfolio-website
# ? In which directory is your code located? ./
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add all production environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_CONTACT_EMAIL=your.email@example.com
```

### 4. Custom Domain (Optional)

1. Go to Settings → Domains in your Vercel project
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

## Build Configuration

### Next.js Configuration

The `next.config.js` is already configured for static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  trailingSlash: true,
  distDir: 'out'
};

module.exports = nextConfig;
```

### Build Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && next export"
  }
}
```

## Performance Optimization

### 1. Image Optimization

```typescript
// Use Next.js Image component with optimization
import Image from 'next/image';

<Image
  src="/profile-photo.jpg"
  alt="Profile"
  width={400}
  height={400}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. Code Splitting

```typescript
// Lazy load heavy components
import { lazy, Suspense } from 'react';

const PhotoAlbum = lazy(() => import('./PhotoAlbum'));
const ResumeUpload = lazy(() => import('./ResumeUpload'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhotoAlbum />
    </Suspense>
  );
}
```

### 3. Caching Strategy

```typescript
// API route caching
export const revalidate = 3600; // 1 hour

// Static generation with ISR
export async function generateStaticParams() {
  return []; // Static paths
}
```

## Monitoring and Analytics

### 1. Vercel Analytics

```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to _app.tsx
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

### 2. Error Monitoring

```typescript
// Error boundary for production
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
```

## Security Configuration

### 1. Content Security Policy

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
          }
        ]
      }
    ];
  }
};
```

### 2. Environment Security

```bash
# Never commit these files
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore
echo "*.env" >> .gitignore
```

## Backup and Recovery

### 1. Database Backup

```sql
-- Create backup of important data
CREATE TABLE profiles_backup AS SELECT * FROM profiles;
CREATE TABLE resume_sections_backup AS SELECT * FROM resume_sections;
CREATE TABLE photos_backup AS SELECT * FROM photos;
```

### 2. Code Backup

```bash
# Regular git commits
git add .
git commit -m "Update: [description]"
git push origin main

# Create release tags
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

#### Environment Variable Issues
```bash
# Verify environment variables are loaded
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
```

#### Database Connection Issues
```bash
# Test Supabase connection
curl -H "apikey: YOUR_ANON_KEY" \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     "https://YOUR_PROJECT.supabase.co/rest/v1/profiles"
```

### Performance Issues

```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build

# Check Core Web Vitals
# Use Lighthouse in Chrome DevTools
```

## Maintenance

### Regular Tasks

1. **Weekly**: Check Vercel deployment logs
2. **Monthly**: Review Supabase usage and performance
3. **Quarterly**: Update dependencies and security patches

```bash
# Update dependencies
npm update
npm audit fix

# Check for outdated packages
npm outdated
```

### Monitoring Checklist

- [ ] Website loads correctly
- [ ] All forms submit successfully
- [ ] Images load properly
- [ ] Resume upload works
- [ ] Contact form sends emails
- [ ] Mobile responsiveness
- [ ] Page load speed < 3 seconds
- [ ] No console errors

This deployment guide ensures a smooth, secure, and performant deployment of your portfolio website.