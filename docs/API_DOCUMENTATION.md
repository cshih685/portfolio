# API Documentation

## Overview

The Portfolio Website API provides endpoints for managing resume content, photo galleries, contact forms, and user profiles. Built with Next.js API routes and Supabase backend.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.vercel.app/api
```

## Authentication

Currently, the API operates without authentication for public portfolio content. Future versions will implement JWT-based authentication for admin operations.

```typescript
// Future authentication header
Authorization: Bearer <jwt_token>
```

## Response Format

All API responses follow a consistent format:

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}
```

### Success Response Example
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe"
  },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response Example
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Invalid file format. Only .docx files are supported.",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Endpoints

### Resume Management

#### Get Resume Data
Retrieves the current resume content and sections.

```http
GET /api/resume
```

**Response:**
```typescript
interface ResumeResponse {
  sections: ResumeSection[];
  lastUpdated: string;
}

interface ResumeSection {
  id: string;
  title: string;
  content: string;
  type: 'header' | 'experience' | 'education' | 'skills' | 'contact' | 'summary' | 'other';
  orderIndex: number;
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "sections": [
      {
        "id": "1",
        "title": "Professional Summary",
        "content": "<p>Experienced full-stack developer...</p>",
        "type": "summary",
        "orderIndex": 1
      }
    ],
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

#### Upload Resume Document
Uploads and parses a Word document to extract resume content.

```http
POST /api/resume/upload
Content-Type: multipart/form-data
```

**Request Body:**
```typescript
FormData {
  resume: File; // .doc or .docx file
}
```

**Response:**
```typescript
interface UploadResponse {
  sections: ResumeSection[];
  content: string;
  rawHtml: string;
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "sections": [...],
    "content": "Full HTML content",
    "rawHtml": "Raw parsed HTML"
  },
  "message": "Resume uploaded and parsed successfully"
}
```

**Error Responses:**
- `400` - No file provided or invalid file type
- `413` - File too large (max 10MB)
- `500` - Parsing error

### Photo Gallery

#### Get Photos
Retrieves all photos in the gallery.

```http
GET /api/photos
```

**Query Parameters:**
- `limit` (optional): Number of photos to return (default: 50)
- `offset` (optional): Number of photos to skip (default: 0)

**Response:**
```typescript
interface PhotosResponse {
  photos: Photo[];
  total: number;
  hasMore: boolean;
}

interface Photo {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  thumbnailUrl: string;
  orderIndex: number;
  createdAt: string;
}
```

#### Upload Photo
Uploads a new photo to the gallery.

```http
POST /api/photos
Content-Type: multipart/form-data
```

**Request Body:**
```typescript
FormData {
  photo: File; // Image file (jpg, png, webp)
  title: string;
  caption?: string;
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "photo_123",
    "title": "Mountain View",
    "caption": "Beautiful sunset in Colorado",
    "imageUrl": "https://storage.url/image.jpg",
    "thumbnailUrl": "https://storage.url/thumb.jpg"
  }
}
```

#### Delete Photo
Removes a photo from the gallery.

```http
DELETE /api/photos/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Photo deleted successfully"
}
```

### Contact Management

#### Submit Contact Form
Processes contact form submissions.

```http
POST /api/contact
Content-Type: application/json
```

**Request Body:**
```typescript
interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `subject`: Required, 5-200 characters
- `message`: Required, 10-2000 characters

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully. I'll get back to you soon!"
}
```

**Error Responses:**
- `400` - Validation errors
- `429` - Rate limit exceeded (max 5 submissions per hour per IP)
- `500` - Email delivery failure

### Profile Management

#### Get Profile
Retrieves public profile information.

```http
GET /api/profile
```

**Response:**
```typescript
interface ProfileResponse {
  name: string;
  title: string;
  introduction: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}
```

#### Update Profile
Updates profile information (requires authentication in future versions).

```http
PUT /api/profile
Content-Type: application/json
```

**Request Body:**
```typescript
interface ProfileUpdateRequest {
  name?: string;
  title?: string;
  introduction?: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}
```

## Error Codes

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (future authentication)
- `403` - Forbidden (future authorization)
- `404` - Not Found
- `413` - Payload Too Large
- `429` - Too Many Requests (rate limiting)
- `500` - Internal Server Error

### Custom Error Codes
```typescript
enum ErrorCodes {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  PARSING_ERROR = 'PARSING_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  DATABASE_ERROR = 'DATABASE_ERROR',
  STORAGE_ERROR = 'STORAGE_ERROR'
}
```

## Rate Limiting

API endpoints are protected by rate limiting to prevent abuse:

- **Contact Form**: 5 submissions per hour per IP
- **File Uploads**: 10 uploads per hour per IP
- **General API**: 100 requests per minute per IP

Rate limit headers are included in responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

## File Upload Specifications

### Resume Documents
- **Formats**: `.doc`, `.docx`
- **Max Size**: 10MB
- **Processing**: Automatic parsing with mammoth.js
- **Storage**: Temporary processing, parsed content stored in database

### Photo Uploads
- **Formats**: `.jpg`, `.jpeg`, `.png`, `.webp`
- **Max Size**: 5MB per image
- **Processing**: Automatic thumbnail generation (400x300)
- **Storage**: Supabase Storage with CDN distribution

## Webhooks (Future Feature)

Future versions will support webhooks for real-time updates:

```http
POST /api/webhooks/contact
POST /api/webhooks/resume-update
POST /api/webhooks/photo-upload
```

## SDK Examples

### JavaScript/TypeScript Client

```typescript
class PortfolioAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getResume(): Promise<ResumeResponse> {
    const response = await fetch(`${this.baseUrl}/api/resume`);
    return response.json();
  }

  async uploadResume(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await fetch(`${this.baseUrl}/api/resume/upload`, {
      method: 'POST',
      body: formData,
    });
    
    return response.json();
  }

  async submitContact(data: ContactRequest): Promise<APIResponse<void>> {
    const response = await fetch(`${this.baseUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  }
}

// Usage
const api = new PortfolioAPI('https://your-domain.vercel.app');
const resume = await api.getResume();
```

### React Hook Example

```typescript
function useResume() {
  const [resume, setResume] = useState<ResumeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/resume')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setResume(data.data);
        } else {
          setError(data.error);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { resume, loading, error };
}
```

## Testing

### API Testing with curl

```bash
# Get resume data
curl -X GET https://your-domain.vercel.app/api/resume

# Upload resume
curl -X POST \
  -F "resume=@resume.docx" \
  https://your-domain.vercel.app/api/resume/upload

# Submit contact form
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","subject":"Hello","message":"Test message"}' \
  https://your-domain.vercel.app/api/contact
```

### Integration Testing

```typescript
describe('Resume API', () => {
  test('should fetch resume data', async () => {
    const response = await fetch('/api/resume');
    const data = await response.json();
    
    expect(data.success).toBe(true);
    expect(data.data.sections).toBeDefined();
  });

  test('should upload resume document', async () => {
    const formData = new FormData();
    formData.append('resume', mockFile);
    
    const response = await fetch('/api/resume/upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    expect(data.success).toBe(true);
  });
});
```

This API documentation provides comprehensive information for integrating with the portfolio website's backend services.