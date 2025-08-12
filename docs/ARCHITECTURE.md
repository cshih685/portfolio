# Portfolio Website Architecture

## System Overview

The portfolio website follows a modern JAMstack architecture with server-side rendering capabilities, built on Next.js with Supabase as the backend-as-a-service platform.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  Browser (React/Next.js)                                    │
│  ├── Components (UI Layer)                                  │
│  ├── Pages (Route Handlers)                                 │
│  ├── State Management (React Hooks)                         │
│  └── API Client (Fetch/Axios)                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                      │
├─────────────────────────────────────────────────────────────┤
│  Next.js API Routes                                         │
│  ├── /api/resume (GET, POST)                               │
│  ├── /api/resume/upload (POST)                             │
│  ├── /api/contact (POST)                                   │
│  └── /api/photos (GET, POST, DELETE)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVICE LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  Business Logic Services                                    │
│  ├── ResumeParser (Word → HTML)                            │
│  ├── ImageProcessor (Upload & Resize)                      │
│  ├── EmailService (Contact Form)                           │
│  └── ValidationService (Input Sanitization)               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        DATA LAYER                           │
├─────────────────────────────────────────────────────────────┤
│  Supabase (PostgreSQL + Storage + Auth)                    │
│  ├── Database (Structured Data)                            │
│  ├── Storage (Files & Images)                              │
│  ├── Real-time (Live Updates)                              │
│  └── Authentication (Future)                               │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Hierarchical Component Structure

```
App (Root Layout)
├── Navbar (Global Navigation)
├── Main Content
│   ├── Hero (Landing Section)
│   ├── About (Personal Introduction)
│   ├── Resume (Professional Experience)
│   │   ├── ResumeDisplay (Parsed Content)
│   │   └── ResumeUpload (File Upload Modal)
│   ├── PhotoAlbum (Image Gallery)
│   │   ├── PhotoGrid (Thumbnail Layout)
│   │   └── PhotoModal (Lightbox View)
│   └── Contact (Contact Form & Info)
└── Footer (Site Footer)
```

### Component Communication Patterns

```typescript
// Props Down, Events Up Pattern
Parent Component
├── State Management (useState, useEffect)
├── Data Fetching (API calls)
├── Event Handlers (callbacks)
└── Child Components
    ├── Props (data + callbacks)
    ├── Local State (UI state only)
    └── Events (trigger parent callbacks)
```

## Data Flow Architecture

### Client-Side Data Flow

```
User Interaction
      ↓
Component Event Handler
      ↓
State Update (React Hook)
      ↓
API Call (if needed)
      ↓
Server Response
      ↓
State Update
      ↓
Component Re-render
      ↓
UI Update
```

### Server-Side Data Flow

```
API Request
      ↓
Route Handler (Next.js API)
      ↓
Input Validation
      ↓
Business Logic Service
      ↓
Database Query (Supabase)
      ↓
Data Processing
      ↓
Response Formatting
      ↓
HTTP Response
```

## Database Architecture

### Entity Relationship Diagram

```sql
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    profiles     │    │ resume_sections │    │     photos      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │◄──┤ profile_id (FK) │    │ id (PK)         │
│ name            │    │ id (PK)         │    │ profile_id (FK) │◄─┐
│ title           │    │ title           │    │ title           │  │
│ introduction    │    │ content         │    │ caption         │  │
│ email           │    │ section_type    │    │ image_url       │  │
│ phone           │    │ order_index     │    │ thumbnail_url   │  │
│ location        │    │ created_at      │    │ order_index     │  │
│ social_links    │    │ updated_at      │    │ created_at      │  │
│ created_at      │    └─────────────────┘    └─────────────────┘  │
│ updated_at      │                                                │
└─────────────────┘                                                │
         │                                                         │
         └─────────────────────────────────────────────────────────┘

┌─────────────────────┐
│ contact_submissions │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ email               │
│ subject             │
│ message             │
│ status              │
│ created_at          │
└─────────────────────┘
```

### Database Indexes

```sql
-- Performance optimization indexes
CREATE INDEX idx_resume_sections_profile_id ON resume_sections(profile_id);
CREATE INDEX idx_resume_sections_order ON resume_sections(profile_id, order_index);
CREATE INDEX idx_photos_profile_id ON photos(profile_id);
CREATE INDEX idx_photos_order ON photos(profile_id, order_index);
CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);
```

## API Architecture

### RESTful API Design

```typescript
// API Endpoint Structure
/api/
├── resume/
│   ├── GET     /api/resume           # Fetch resume data
│   ├── POST    /api/resume/upload    # Upload Word document
│   └── PUT     /api/resume           # Update resume content
├── photos/
│   ├── GET     /api/photos           # Fetch photo gallery
│   ├── POST    /api/photos           # Upload new photo
│   └── DELETE  /api/photos/:id       # Delete photo
├── contact/
│   └── POST    /api/contact          # Submit contact form
└── profile/
    ├── GET     /api/profile          # Fetch profile data
    └── PUT     /api/profile          # Update profile info
```

### Request/Response Patterns

```typescript
// Standard API Response Format
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

// Error Handling Pattern
interface APIError {
  code: string;
  message: string;
  details?: any;
  statusCode: number;
}
```

## File Processing Architecture

### Resume Upload Flow

```
Word Document Upload
        ↓
File Validation (type, size)
        ↓
Mammoth.js Parser
        ↓
HTML Content Extraction
        ↓
Section Identification
        ↓
Content Sanitization
        ↓
Database Storage
        ↓
Response with Parsed Data
```

### Image Upload Flow

```
Image File Upload
        ↓
File Validation
        ↓
Image Optimization
        ↓
Thumbnail Generation
        ↓
Supabase Storage Upload
        ↓
Database Record Creation
        ↓
URL Generation
        ↓
Response with Image URLs
```

## Security Architecture

### Security Layers

```
┌─────────────────────────────────────────┐
│           PRESENTATION LAYER            │
│  • Input Validation (Client-side)      │
│  • XSS Prevention                      │
│  • CSRF Protection                     │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│           APPLICATION LAYER             │
│  • Input Sanitization                  │
│  • Rate Limiting                       │
│  • File Type Validation                │
│  • Size Limits                         │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│              DATA LAYER                 │
│  • Row Level Security (RLS)            │
│  • SQL Injection Prevention            │
│  • Encrypted Storage                   │
│  • Access Control                      │
└─────────────────────────────────────────┘
```

### Authentication Flow (Future Implementation)

```
User Login Request
        ↓
Credential Validation
        ↓
JWT Token Generation
        ↓
Token Storage (HttpOnly Cookie)
        ↓
Protected Route Access
        ↓
Token Verification
        ↓
Database Query with RLS
        ↓
Authorized Response
```

## Performance Architecture

### Caching Strategy

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Browser Cache │    │   CDN Cache     │    │  Server Cache   │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Static Assets │    │ • Images        │    │ • API Responses │
│ • API Responses │    │ • CSS/JS        │    │ • Database      │
│ • Images        │    │ • Fonts         │    │   Queries       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Optimization Techniques

```typescript
// Code Splitting
const PhotoAlbum = lazy(() => import('./PhotoAlbum'));
const ResumeUpload = lazy(() => import('./ResumeUpload'));

// Image Optimization
<Image
  src={photo.src}
  alt={photo.alt}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
/>

// API Response Caching
export const revalidate = 3600; // 1 hour cache
```

## Deployment Architecture

### Build Process

```
Source Code (Git)
        ↓
Dependency Installation
        ↓
TypeScript Compilation
        ↓
Next.js Build Process
        ↓
Static Asset Generation
        ↓
Bundle Optimization
        ↓
Deployment Package
        ↓
Vercel Deployment
```

### Environment Configuration

```typescript
// Environment Variables
interface EnvironmentConfig {
  // Database
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  
  // Application
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_CONTACT_EMAIL: string;
  
  // External Services
  RESEND_API_KEY?: string;
  ANALYTICS_ID?: string;
}
```

## Monitoring & Observability

### Logging Strategy

```typescript
// Structured Logging
interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, any>;
  userId?: string;
  requestId?: string;
}
```

### Error Tracking

```typescript
// Error Boundary Implementation
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to monitoring service
    console.error('Component Error:', error, errorInfo);
  }
}
```

## Scalability Considerations

### Horizontal Scaling Points

1. **CDN Distribution**: Static assets via Vercel Edge Network
2. **Database Scaling**: Supabase auto-scaling PostgreSQL
3. **File Storage**: Supabase Storage with global distribution
4. **API Rate Limiting**: Request throttling per user/IP

### Performance Monitoring

```typescript
// Core Web Vitals Tracking
interface PerformanceMetrics {
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  TTFB: number; // Time to First Byte
}
```

This architecture provides a solid foundation for a professional portfolio website with room for future enhancements and scaling.