import mammoth from 'mammoth';

export interface ParsedResume {
  content: string;
  sections: ResumeSection[];
  rawHtml: string;
}

export interface ResumeSection {
  title: string;
  content: string;
  type: 'header' | 'experience' | 'education' | 'skills' | 'contact' | 'summary' | 'other';
}

export class ResumeParser {
  static async parseWordDocument(file: File): Promise<ParsedResume> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      
      const sections = this.extractSections(result.value);
      
      return {
        content: result.value,
        sections,
        rawHtml: result.value
      };
    } catch (error) {
      console.error('Error parsing Word document:', error);
      throw new Error('Failed to parse resume document');
    }
  }

  static async parseWordBuffer(buffer: ArrayBuffer): Promise<ParsedResume> {
    try {
      const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
      const sections = this.extractSections(result.value);
      
      return {
        content: result.value,
        sections,
        rawHtml: result.value
      };
    } catch (error) {
      console.error('Error parsing Word document:', error);
      throw new Error('Failed to parse resume document');
    }
  }

  private static extractSections(html: string): ResumeSection[] {
    const sections: ResumeSection[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Common section headers to look for
    const sectionKeywords = {
      experience: ['experience', 'work experience', 'employment', 'career', 'professional experience'],
      education: ['education', 'academic', 'qualifications', 'degrees'],
      skills: ['skills', 'technical skills', 'competencies', 'expertise', 'technologies'],
      contact: ['contact', 'contact information', 'personal details'],
      summary: ['summary', 'profile', 'objective', 'about', 'overview']
    };

    // Extract text content and identify sections
    const elements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div');
    let currentSection: ResumeSection | null = null;
    
    elements.forEach(element => {
      const text = element.textContent?.toLowerCase().trim() || '';
      
      // Check if this is a section header
      const sectionType = this.identifySectionType(text, sectionKeywords);
      
      if (sectionType && element.tagName.match(/^H[1-6]$/)) {
        // Save previous section if exists
        if (currentSection) {
          sections.push(currentSection);
        }
        
        // Start new section
        currentSection = {
          title: element.textContent?.trim() || '',
          content: '',
          type: sectionType
        };
      } else if (currentSection && text) {
        // Add content to current section
        currentSection.content += element.outerHTML + '\n';
      } else if (!currentSection && text) {
        // Content before any section header
        sections.push({
          title: 'Header',
          content: element.outerHTML,
          type: 'header'
        });
      }
    });
    
    // Add the last section
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  }

  private static identifySectionType(text: string, keywords: any): ResumeSection['type'] {
    for (const [type, keywordList] of Object.entries(keywords)) {
      if (keywordList.some((keyword: string) => text.includes(keyword))) {
        return type as ResumeSection['type'];
      }
    }
    return 'other';
  }
}