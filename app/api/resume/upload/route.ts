import { NextRequest, NextResponse } from 'next/server';
import { ResumeParser } from '@/lib/resumeParser';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
      return NextResponse.json(
        { error: 'Only Word documents (.doc, .docx) are supported' },
        { status: 400 }
      );
    }

    // Parse the Word document
    const parsedResume = await ResumeParser.parseWordDocument(file);
    
    // In a real application, you would save this to your database
    // For now, we'll return the parsed content
    return NextResponse.json({
      success: true,
      data: parsedResume,
      message: 'Resume uploaded and parsed successfully'
    });

  } catch (error) {
    console.error('Resume upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process resume' },
      { status: 500 }
    );
  }
}