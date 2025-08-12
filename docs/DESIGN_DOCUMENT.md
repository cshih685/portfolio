# Portfolio Website Design Document

## Project Overview

A modern, professional portfolio website built with Next.js, React, and Supabase, featuring dynamic content management, resume parsing, and photo gallery functionality.

## Design Philosophy

### Visual Design Principles
- **Apple-level aesthetics**: Clean, sophisticated, and intuitive user experience
- **Modern minimalism**: Emphasis on whitespace, typography, and subtle animations
- **Professional elegance**: Suitable for showcasing professional work and personal brand
- **Responsive-first**: Mobile-optimized with progressive enhancement for larger screens

### Color System
```css
Primary Colors:
- Deep Navy: #1e293b (slate-800) - Headers, primary text
- Vibrant Blue: #3b82f6 (blue-600) - CTAs, links, accents
- Light Blue: #dbeafe (blue-100) - Backgrounds, highlights

Secondary Colors:
- Pure White: #ffffff - Card backgrounds, contrast
- Light Gray: #f8fafc (slate-50) - Section backgrounds
- Medium Gray: #64748b (slate-500) - Secondary text
- Dark Gray: #334155 (slate-700) - Body text

Accent Colors:
- Success Green: #10b981 (emerald-500)
- Warning Orange: #f59e0b (amber-500)
- Error Red: #ef4444 (red-500)
- Purple Accent: #8b5cf6 (violet-500)
```

### Typography Scale
```css
Font Family: Inter (Google Fonts)
- Headings: 600-700 weight
- Body: 400-500 weight
- Captions: 400 weight

Scale:
- H1: 3rem-4.5rem (48px-72px) - Hero titles
- H2: 2.25rem-3rem (36px-48px) - Section headers
- H3: 1.5rem-1.875rem (24px-30px) - Subsection headers
- H4: 1.25rem (20px) - Card titles
- Body: 1rem-1.125rem (16px-18px) - Main content
- Small: 0.875rem (14px) - Captions, metadata
```

### Spacing System (8px Grid)
```css
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)
- 4xl: 5rem (80px)
```

## User Experience Design

### Navigation Flow
1. **Landing (Hero)** → Immediate impact with name, role, and CTA
2. **About** → Personal introduction and skill overview
3. **Resume** → Professional experience and downloadable resume
4. **Photos** → Personal life glimpse through photo gallery
5. **Contact** → Multiple contact methods and form

### Interaction Patterns
- **Smooth scrolling** between sections
- **Hover states** on all interactive elements
- **Loading states** for async operations
- **Progressive disclosure** for complex content
- **Micro-animations** for engagement

### Responsive Breakpoints
```css
- Mobile: < 768px (sm)
- Tablet: 768px - 1024px (md-lg)
- Desktop: > 1024px (xl+)
```

## Component Architecture

### Core Components
```
components/
├── layout/
│   ├── Navbar.tsx          # Navigation with smooth scroll
│   ├── Hero.tsx            # Landing section with CTA
│   └── Footer.tsx          # Site footer with links
├── sections/
│   ├── About.tsx           # Personal intro + skills grid
│   ├── Resume.tsx          # Resume display + download
│   ├── PhotoAlbum.tsx      # Photo gallery with modal
│   └── Contact.tsx         # Contact form + info
├── features/
│   └── ResumeUpload.tsx    # Resume upload modal
└── ui/                     # Reusable UI components
```

### Component Design Patterns
- **Composition over inheritance**
- **Single responsibility principle**
- **Props interface definitions**
- **Error boundary implementation**
- **Loading state management**

## Technical Architecture

### Frontend Stack
```
Next.js 13.5.1
├── React 18.2.0           # UI library
├── TypeScript 5.2.2       # Type safety
├── Tailwind CSS 3.3.3     # Styling framework
├── Lucide React           # Icon library
└── Mammoth.js             # Word document parsing
```

### Backend Integration
```
API Routes (/app/api/)
├── /resume
│   ├── GET                # Fetch resume data
│   └── /upload
│       └── POST           # Upload & parse Word docs
└── /contact
    └── POST               # Handle contact form
```

### Database Schema (Supabase/PostgreSQL)
```sql
-- User profile information
profiles (
  id uuid PRIMARY KEY,
  name text,
  title text,
  introduction text,
  email text,
  phone text,
  location text,
  social_links jsonb,
  created_at timestamptz,
  updated_at timestamptz
);

-- Resume sections and content
resume_sections (
  id uuid PRIMARY KEY,
  profile_id uuid REFERENCES profiles(id),
  title text,
  content text,
  section_type text,
  order_index integer,
  created_at timestamptz,
  updated_at timestamptz
);

-- Photo gallery
photos (
  id uuid PRIMARY KEY,
  profile_id uuid REFERENCES profiles(id),
  title text,
  caption text,
  image_url text,
  thumbnail_url text,
  order_index integer,
  created_at timestamptz
);

-- Contact form submissions
contact_submissions (
  id uuid PRIMARY KEY,
  name text,
  email text,
  subject text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz
);
```

## File Structure

### Project Organization
```
portfolio-website/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── sections/          # Page sections
│   ├── features/          # Feature components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility libraries
│   ├── utils.ts          # Helper functions
│   └── resumeParser.ts   # Resume parsing logic
├── docs/                  # Documentation
├── public/               # Static assets
└── types/                # TypeScript definitions
```

## Performance Considerations

### Optimization Strategies
- **Static generation** for content pages
- **Image optimization** with Next.js Image component
- **Code splitting** for feature components
- **Lazy loading** for photo gallery
- **Caching strategies** for API responses

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Security Considerations

### Data Protection
- **Input validation** on all forms
- **File type validation** for uploads
- **Rate limiting** on API endpoints
- **CORS configuration** for API access
- **Environment variable** protection

### Authentication (Future)
- **Row Level Security** with Supabase
- **JWT token** management
- **Admin panel** access control

## Deployment Architecture

### Hosting Strategy
```
Production Environment:
├── Frontend: Vercel (Next.js optimized)
├── Database: Supabase (PostgreSQL)
├── File Storage: Supabase Storage
└── CDN: Vercel Edge Network
```

### Environment Configuration
```
Development:
- Local Next.js server
- Supabase local development
- Hot reload enabled

Production:
- Static export optimization
- Environment variable injection
- Automatic deployments from Git
```

## Future Enhancements

### Phase 2 Features
- **Blog system** with markdown support
- **Project showcase** with GitHub integration
- **Analytics dashboard** for visitor insights
- **Multi-language support** (i18n)
- **Dark mode toggle**

### Phase 3 Features
- **Admin panel** for content management
- **Email newsletter** integration
- **SEO optimization** tools
- **Performance monitoring**
- **A/B testing** framework

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** ratios (4.5:1 minimum)
- **Focus indicators** on interactive elements
- **Alt text** for all images
- **Semantic HTML** structure

## Browser Support

### Target Browsers
- **Chrome**: Last 2 versions
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions
- **Edge**: Last 2 versions
- **Mobile Safari**: iOS 12+
- **Chrome Mobile**: Android 8+