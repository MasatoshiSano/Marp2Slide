import { 
  MarkdownFile, 
  ContentSection, 
  TOCItem, 
  ValidationResult, 
  ValidationError, 
  ErrorCode 
} from '../types/index.js';

export interface ParsedContent {
  title: string;
  sections: ContentSection[];
  tableOfContents: TOCItem[];
  metadata: ContentMetadata;
}

export interface ContentMetadata {
  wordCount: number;
  estimatedReadingTime: number;
  headingCount: number;
  codeBlockCount: number;
  imageCount: number;
  linkCount: number;
}

export class ContentParser {
  private static readonly WORDS_PER_MINUTE = 200;
  private static readonly MAX_CONTENT_LENGTH = 50000;

  parseMarkdownFile(file: MarkdownFile): ParsedContent {
    const lines = file.content.split('\n');
    const sections = this.extractSections(lines);
    const tableOfContents = this.generateTableOfContents(sections);
    const title = this.extractMainTitle(lines);
    const metadata = this.extractContentMetadata(file.content);

    return {
      title,
      sections,
      tableOfContents,
      metadata
    };
  }

  private extractSections(lines: string[]): ContentSection[] {
    const sections: ContentSection[] = [];
    let currentSection: Partial<ContentSection> | null = null;
    let sectionContent: string[] = [];
    let sectionId = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

      if (headingMatch) {
        // Save previous section if exists
        if (currentSection) {
          sections.push({
            id: `section-${sectionId++}`,
            title: currentSection.title!,
            level: currentSection.level!,
            content: sectionContent.join('\n').trim(),
            type: this.determineContentType(sectionContent.join('\n')),
            estimatedTime: this.estimateReadingTime(sectionContent.join('\n'))
          });
        }

        // Start new section
        const level = headingMatch[1].length;
        const title = headingMatch[2].trim();
        
        currentSection = {
          title,
          level
        };
        sectionContent = [];
      } else {
        if (currentSection) {
          sectionContent.push(line);
        }
      }
    }

    // Add last section
    if (currentSection) {
      sections.push({
        id: `section-${sectionId++}`,
        title: currentSection.title!,
        level: currentSection.level!,
        content: sectionContent.join('\n').trim(),
        type: this.determineContentType(sectionContent.join('\n')),
        estimatedTime: this.estimateReadingTime(sectionContent.join('\n'))
      });
    }

    return sections;
  }

  private determineContentType(content: string): any {
    const lowercaseContent = content.toLowerCase();
    
    // Check for numerical data indicators
    if (this.hasNumericalData(content)) {
      return 'numerical-data';
    }
    
    // Check for structural relationships
    if (this.hasStructuralElements(lowercaseContent)) {
      return 'structural-relationship';
    }
    
    // Check for temporal flow
    if (this.hasTemporalElements(lowercaseContent)) {
      return 'temporal-flow';
    }
    
    // Check for information organization
    if (this.hasOrganizationalElements(content)) {
      return 'information-organization';
    }
    
    // Check for emotional/experiential content
    if (this.hasEmotionalElements(lowercaseContent)) {
      return 'emotional-experiential';
    }
    
    // Default to information organization
    return 'information-organization';
  }

  private hasNumericalData(content: string): boolean {
    const numericalPatterns = [
      /\d+%/,                    // Percentages
      /\d+(\.\d+)?[万億円]/,     // Japanese currency units
      /\d+(\.\d+)?\s*(円|yen)/i, // Currency
      /\d+:\d+/,                 // Ratios
      /\d+(\.\d+)?\s*(倍|times)/i, // Multipliers
      /売上|利益|収益|コスト/,   // Business metrics keywords
      /KPI|指標|達成率|成長率/   // Performance indicators
    ];
    
    return numericalPatterns.some(pattern => pattern.test(content));
  }

  private hasStructuralElements(content: string): boolean {
    const structuralKeywords = [
      '構造', '組織', 'システム', '関係', '階層', '分類',
      'ネットワーク', '相互作用', '依存', '接続', '関連性'
    ];
    
    return structuralKeywords.some(keyword => content.includes(keyword));
  }

  private hasTemporalElements(content: string): boolean {
    const temporalKeywords = [
      'ステップ', '手順', 'プロセス', '流れ', '順序', '段階',
      'タイムライン', '時系列', '履歴', '経過', 'ロードマップ',
      '次に', 'その後', '最後に', '第一段階', '第二段階'
    ];
    
    return temporalKeywords.some(keyword => content.includes(keyword));
  }

  private hasOrganizationalElements(content: string): boolean {
    const organizationalPatterns = [
      /^\s*[-*+]\s+/m,           // Bullet points
      /^\s*\d+\.\s+/m,           // Numbered lists
      /^\s*\|\s*.+\s*\|/m,       // Tables
      /^\s*>\s+/m,               // Blockquotes
      /```[\s\S]*?```/,          // Code blocks
    ];
    
    return organizationalPatterns.some(pattern => pattern.test(content));
  }

  private hasEmotionalElements(content: string): boolean {
    const emotionalKeywords = [
      '事例', '体験', 'ストーリー', '物語', '感情', '印象',
      '成功', '失敗', '困難', '克服', '達成', '感動',
      'お客様', '顧客', '実績', '証言', '推薦'
    ];
    
    return emotionalKeywords.some(keyword => content.includes(keyword));
  }

  private generateTableOfContents(sections: ContentSection[]): TOCItem[] {
    const toc: TOCItem[] = [];
    const stack: TOCItem[] = [];

    sections.forEach((section, index) => {
      const tocItem: TOCItem = {
        title: section.title,
        level: section.level,
        page: index + 1,
        children: []
      };

      // Remove items from stack that are at the same or deeper level
      while (stack.length > 0 && stack[stack.length - 1].level >= section.level) {
        stack.pop();
      }

      if (stack.length === 0) {
        // Top level item
        toc.push(tocItem);
      } else {
        // Child item
        const parent = stack[stack.length - 1];
        if (!parent.children) parent.children = [];
        parent.children.push(tocItem);
      }

      stack.push(tocItem);
    });

    return toc;
  }

  private extractMainTitle(lines: string[]): string {
    for (const line of lines) {
      const titleMatch = line.match(/^#\s+(.+)$/);
      if (titleMatch) {
        return titleMatch[1].trim();
      }
    }
    return 'Untitled Document';
  }

  private extractContentMetadata(content: string): ContentMetadata {
    const wordCount = this.countWords(content);
    const estimatedReadingTime = this.estimateReadingTime(content);
    const headingCount = (content.match(/^#{1,6}\s+.+$/gm) || []).length;
    const codeBlockCount = (content.match(/```[\s\S]*?```/g) || []).length;
    const imageCount = (content.match(/!\[.*?\]\(.*?\)/g) || []).length;
    const linkCount = (content.match(/\[.*?\]\(.*?\)/g) || []).length;

    return {
      wordCount,
      estimatedReadingTime,
      headingCount,
      codeBlockCount,
      imageCount,
      linkCount
    };
  }

  private countWords(content: string): number {
    // Remove markdown syntax for accurate word count
    const cleanContent = content
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]+`/g, '')        // Remove inline code
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[.*?\]\(.*?\)/g, '')  // Remove links
      .replace(/#{1,6}\s+/g, '')       // Remove heading markers
      .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Remove emphasis
      .replace(/^\s*[-*+]\s+/gm, '')   // Remove list markers
      .replace(/^\s*\d+\.\s+/gm, '')   // Remove numbered list markers
      .replace(/^\s*>\s+/gm, '');      // Remove blockquote markers

    // Count Japanese and English words
    const englishWords = (cleanContent.match(/[a-zA-Z]+/g) || []).length;
    const japaneseChars = (cleanContent.match(/[ひらがなカタカナ漢字]/g) || []).length;
    
    // Estimate Japanese words (average 2-3 characters per word)
    const japaneseWords = Math.ceil(japaneseChars / 2.5);
    
    return englishWords + japaneseWords;
  }

  private estimateReadingTime(content: string): number {
    const wordCount = this.countWords(content);
    return Math.ceil(wordCount / ContentParser.WORDS_PER_MINUTE);
  }

  validateParsedContent(parsedContent: ParsedContent): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: any[] = [];

    // Check if content is too long
    if (parsedContent.metadata.wordCount > 10000) {
      errors.push({
        code: ErrorCode.CONTENT_TOO_LONG,
        message: `Content is too long (${parsedContent.metadata.wordCount} words). Consider splitting into multiple sections.`,
        severity: 'warning'
      });
    }

    // Check if sections have meaningful content
    parsedContent.sections.forEach((section, index) => {
      if (section.content.trim().length < 10) {
        errors.push({
          code: ErrorCode.MISSING_REQUIRED_ELEMENTS,
          message: `Section "${section.title}" has insufficient content.`,
          line: index + 1,
          severity: 'warning'
        });
      }

      // Check for extremely long sections
      if (section.content.length > 5000) {
        errors.push({
          code: ErrorCode.CONTENT_TOO_LONG,
          message: `Section "${section.title}" is too long. Consider splitting into subsections.`,
          line: index + 1,
          severity: 'warning'
        });
      }
    });

    // Check if document has proper structure
    if (parsedContent.sections.length === 0) {
      errors.push({
        code: ErrorCode.MISSING_REQUIRED_ELEMENTS,
        message: 'Document has no structured sections.',
        severity: 'error'
      });
    }

    // Check heading hierarchy
    this.validateHeadingHierarchy(parsedContent.sections, errors);

    return {
      isValid: errors.filter(e => e.severity === 'error').length === 0,
      errors,
      warnings
    };
  }

  private validateHeadingHierarchy(sections: ContentSection[], errors: ValidationError[]): void {
    let previousLevel = 0;

    sections.forEach((section, index) => {
      if (section.level > previousLevel + 1) {
        errors.push({
          code: ErrorCode.INVALID_MARKDOWN,
          message: `Section "${section.title}" skips heading levels (from ${previousLevel} to ${section.level}).`,
          line: index + 1,
          severity: 'warning'
        });
      }
      previousLevel = section.level;
    });
  }

  extractKeywords(content: string): string[] {
    // Remove markdown syntax and extract meaningful keywords
    const cleanContent = content
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`[^`]+`/g, ' ')
      .replace(/!\[.*?\]\(.*?\)/g, ' ')
      .replace(/\[.*?\]\(.*?\)/g, ' ')
      .replace(/#{1,6}\s+/g, ' ')
      .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
      .replace(/^\s*[-*+]\s+/gm, ' ')
      .replace(/^\s*\d+\.\s+/gm, ' ')
      .replace(/^\s*>\s+/gm, ' ');

    // Extract Japanese and English keywords
    const words = cleanContent
      .split(/\s+/)
      .filter(word => word.length > 2)
      .filter(word => !/^[0-9\s\p{P}]+$/u.test(word))
      .map(word => word.toLowerCase().replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ''))
      .filter(word => word.length > 1);

    // Remove duplicates and return sorted array
    return Array.from(new Set(words)).sort();
  }

  splitContentIntoSlides(content: string, maxWordsPerSlide: number = 150): string[] {
    const sections = this.extractSections(content.split('\n'));
    const slides: string[] = [];
    
    sections.forEach(section => {
      const sectionWordCount = this.countWords(section.content);
      
      if (sectionWordCount <= maxWordsPerSlide) {
        // Section fits in one slide
        slides.push(`# ${section.title}\n\n${section.content}`);
      } else {
        // Split section into multiple slides
        const paragraphs = section.content.split('\n\n').filter(p => p.trim());
        let currentSlide = `# ${section.title}\n\n`;
        let currentWordCount = this.countWords(section.title);
        
        paragraphs.forEach((paragraph, index) => {
          const paragraphWordCount = this.countWords(paragraph);
          
          if (currentWordCount + paragraphWordCount > maxWordsPerSlide && currentSlide.trim().length > section.title.length + 4) {
            slides.push(currentSlide.trim());
            currentSlide = `# ${section.title} (続き)\n\n${paragraph}\n\n`;
            currentWordCount = this.countWords(section.title) + paragraphWordCount;
          } else {
            currentSlide += `${paragraph}\n\n`;
            currentWordCount += paragraphWordCount;
          }
        });
        
        if (currentSlide.trim().length > section.title.length + 4) {
          slides.push(currentSlide.trim());
        }
      }
    });
    
    return slides;
  }
}