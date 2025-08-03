import { 
  MarkdownFile, 
  SlideDefinition, 
  SlideStructure, 
  LayoutDefinition, 
  StyleDefinition, 
  LayoutPattern, 
  NavigationStructure, 
  InteractionDefinition,
  PatternMapping 
} from '../types/index.js';
import { ContentParser, ParsedContent } from './ContentParser.js';
import { defaultDesignSystem, generateCSSCustomProperties } from '../config/design-system.js';

export class MarpGenerator {
  private contentParser: ContentParser;
  private readonly MAX_LINES_PER_SLIDE = 23;
  private readonly MAX_CHARACTERS_PER_SLIDE = 800;
  private readonly BASE_FONT_SIZE = 22;

  constructor() {
    this.contentParser = new ContentParser();
  }

  async generateMarpSlides(
    file: MarkdownFile, 
    patternMappings?: PatternMapping[]
  ): Promise<SlideStructure> {
    const parsedContent = this.contentParser.parseMarkdownFile(file);
    const slides = await this.convertToSlides(parsedContent, patternMappings);
    const navigation = this.createNavigationStructure(slides);
    const interactions = this.createInteractions(slides);

    return {
      slides,
      navigation,
      interactions
    };
  }

  private async convertToSlides(
    parsedContent: ParsedContent, 
    patternMappings?: PatternMapping[]
  ): Promise<SlideDefinition[]> {
    const slides: SlideDefinition[] = [];
    
    // Create title slide
    slides.push(this.createTitleSlide(parsedContent));

    // Create content slides from sections
    for (let i = 0; i < parsedContent.sections.length; i++) {
      const section = parsedContent.sections[i];
      const patternMapping = patternMappings?.find(pm => pm.sectionId === section.id);
      
      const sectionSlides = await this.createSectionSlides(section, patternMapping, i + 2);
      slides.push(...sectionSlides);
    }

    return slides;
  }

  private createTitleSlide(parsedContent: ParsedContent): SlideDefinition {
    const titleContent = this.generateTitleSlideContent(parsedContent);
    
    return {
      id: 'slide-title',
      order: 1,
      title: parsedContent.title,
      overviewStatement: 'プレゼンテーションの概要と主要なポイントを示します',
      contentSections: [{
        id: 'title-content',
        title: parsedContent.title,
        level: 1,
        content: titleContent,
        type: 'information-organization',
        estimatedTime: 2
      }],
      layout: {
        pattern: LayoutPattern.CENTER,
        grid: { columns: 1, rows: 1, gap: '0' },
        spacing: { padding: '60px 40px', margin: '0', gap: '0' },
        responsive: { breakpoints: [], behavior: 'scale' as any }
      },
      styling: this.createDefaultStyling(),
      animations: []
    };
  }

  private generateTitleSlideContent(parsedContent: ParsedContent): string {
    let content = `<!-- _class: title-slide -->\n`;
    content += `<!-- _style: "text-align: center; padding: 60px 40px;" -->\n\n`;
    
    content += `# ${parsedContent.title}\n\n`;
    
    if (parsedContent.metadata.wordCount > 0) {
      content += `**推定所要時間: ${parsedContent.metadata.estimatedReadingTime}分 | スライド数: ${parsedContent.sections.length + 1}**\n\n`;
    }

    // Add table of contents if available
    if (parsedContent.sections.length > 0) {
      content += `## 主要内容\n\n`;
      parsedContent.sections.slice(0, 5).forEach((section, index) => {
        content += `${index + 1}. ${section.title}\n`;
      });
      
      if (parsedContent.sections.length > 5) {
        content += `... 他 ${parsedContent.sections.length - 5} セクション\n`;
      }
    }

    return content;
  }

  private async createSectionSlides(
    section: any, 
    patternMapping?: PatternMapping, 
    startOrder: number = 1
  ): Promise<SlideDefinition[]> {
    const slides: SlideDefinition[] = [];
    
    // Check if section content needs to be split
    const contentAnalysis = this.analyzeContentLength(section.content);
    
    if (contentAnalysis.needsSplit) {
      const splitSlides = await this.splitSectionIntoSlides(section, patternMapping, startOrder);
      slides.push(...splitSlides);
    } else {
      const slide = await this.createSingleSlide(section, patternMapping, startOrder);
      slides.push(slide);
    }

    return slides;
  }

  private analyzeContentLength(content: string): ContentAnalysis {
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    const totalCharacters = content.length;
    const codeBlocks = (content.match(/```[\s\S]*?```/g) || []).length;
    const longLines = lines.filter(line => line.length > 100).length;

    return {
      lineCount: lines.length,
      characterCount: totalCharacters,
      codeBlockCount: codeBlocks,
      longLineCount: longLines,
      needsSplit: this.shouldSplitContent(lines.length, totalCharacters, codeBlocks, longLines),
      complexity: this.calculateContentComplexity(lines.length, totalCharacters, codeBlocks)
    };
  }

  private shouldSplitContent(
    lineCount: number, 
    characterCount: number, 
    codeBlocks: number, 
    longLines: number
  ): boolean {
    return lineCount > this.MAX_LINES_PER_SLIDE || 
           characterCount > this.MAX_CHARACTERS_PER_SLIDE ||
           (codeBlocks > 0 && lineCount > 15) ||
           longLines > 5;
  }

  private calculateContentComplexity(
    lineCount: number, 
    characterCount: number, 
    codeBlocks: number
  ): 'low' | 'medium' | 'high' {
    let complexity = 0;
    
    if (lineCount > 15) complexity += 2;
    if (characterCount > 600) complexity += 2;
    if (codeBlocks > 1) complexity += 3;
    
    if (complexity >= 5) return 'high';
    if (complexity >= 3) return 'medium';
    return 'low';
  }

  private async splitSectionIntoSlides(
    section: any, 
    patternMapping?: PatternMapping, 
    startOrder: number
  ): Promise<SlideDefinition[]> {
    const slides: SlideDefinition[] = [];
    const paragraphs = this.splitContentIntoParagraphs(section.content);
    
    // Create overview slide first
    const overviewSlide = this.createOverviewSlide(section, startOrder);
    slides.push(overviewSlide);

    // Create detail slides
    let currentSlideContent = '';
    let currentSlideOrder = startOrder + 1;
    let slideIndex = 1;

    for (const paragraph of paragraphs) {
      const potentialContent = currentSlideContent + '\n\n' + paragraph;
      const analysis = this.analyzeContentLength(potentialContent);

      if (analysis.needsSplit && currentSlideContent.length > 0) {
        // Create slide with current content
        const slide = this.createDetailSlide(
          section, 
          currentSlideContent, 
          slideIndex++, 
          currentSlideOrder++,
          patternMapping
        );
        slides.push(slide);
        currentSlideContent = paragraph;
      } else {
        currentSlideContent = potentialContent;
      }
    }

    // Create final slide if there's remaining content
    if (currentSlideContent.trim().length > 0) {
      const slide = this.createDetailSlide(
        section, 
        currentSlideContent, 
        slideIndex, 
        currentSlideOrder,
        patternMapping
      );
      slides.push(slide);
    }

    return slides;
  }

  private splitContentIntoParagraphs(content: string): string[] {
    // Split by double newlines (paragraphs) but keep code blocks together
    const codeBlockPattern = /```[\s\S]*?```/g;
    const codeBlocks: string[] = [];
    
    // Extract code blocks temporarily
    let processedContent = content.replace(codeBlockPattern, (match) => {
      const index = codeBlocks.length;
      codeBlocks.push(match);
      return `__CODEBLOCK_${index}__`;
    });

    // Split into paragraphs
    const paragraphs = processedContent.split(/\n\s*\n/).filter(p => p.trim().length > 0);

    // Restore code blocks
    return paragraphs.map(paragraph => {
      return paragraph.replace(/__CODEBLOCK_(\d+)__/g, (_, index) => {
        return codeBlocks[parseInt(index)] || '';
      });
    });
  }

  private createOverviewSlide(section: any, order: number): SlideDefinition {
    const overviewContent = this.generateOverviewContent(section);
    
    return {
      id: `slide-${section.id}-overview`,
      order,
      title: `${section.title} - 概要`,
      overviewStatement: `${section.title}の全体像と主要なポイントを説明します`,
      contentSections: [{
        id: `${section.id}-overview-content`,
        title: section.title,
        level: section.level,
        content: overviewContent,
        type: section.type,
        estimatedTime: 3
      }],
      layout: this.createLayoutDefinition(LayoutPattern.STANDARD),
      styling: this.createDefaultStyling(),
      animations: []
    };
  }

  private generateOverviewContent(section: any): string {
    let content = `## ${section.title}\n\n`;
    content += `**${section.title}の全体像と主要なポイントを説明します**\n\n`;

    // Extract main points from section content
    const lines = section.content.split('\n').filter(line => line.trim().length > 0);
    const bulletPoints = lines.filter(line => line.match(/^\s*[-*+]\s+/));
    const headings = lines.filter(line => line.match(/^#{2,4}\s+/));

    if (headings.length > 0) {
      content += `### 主要トピック\n\n`;
      headings.slice(0, 5).forEach(heading => {
        const cleanHeading = heading.replace(/^#{2,4}\s+/, '');
        content += `- ${cleanHeading}\n`;
      });
    } else if (bulletPoints.length > 0) {
      content += `### 主要ポイント\n\n`;
      bulletPoints.slice(0, 5).forEach(point => {
        content += `${point}\n`;
      });
    } else {
      // Create overview from first few sentences
      const sentences = section.content.split(/[。．！？]/);
      const relevantSentences = sentences
        .filter(s => s.trim().length > 10)
        .slice(0, 3);
      
      if (relevantSentences.length > 0) {
        content += `### 概要\n\n`;
        relevantSentences.forEach(sentence => {
          content += `- ${sentence.trim()}\n`;
        });
      }
    }

    return content;
  }

  private createDetailSlide(
    section: any, 
    content: string, 
    slideIndex: number, 
    order: number,
    patternMapping?: PatternMapping
  ): SlideDefinition {
    const slideContent = this.generateDetailSlideContent(section, content, slideIndex);
    const layout = this.determineOptimalLayout(content, patternMapping);
    
    return {
      id: `slide-${section.id}-${slideIndex}`,
      order,
      title: `${section.title} (${slideIndex})`,
      overviewStatement: `${section.title}の詳細内容を段階的に説明します`,
      contentSections: [{
        id: `${section.id}-detail-${slideIndex}`,
        title: `${section.title} - 詳細 ${slideIndex}`,
        level: section.level,
        content: slideContent,
        type: section.type,
        estimatedTime: 4
      }],
      layout,
      styling: this.createContentSpecificStyling(content),
      animations: []
    };
  }

  private generateDetailSlideContent(section: any, content: string, slideIndex: number): string {
    let slideContent = `## ${section.title}`;
    
    if (slideIndex > 1) {
      slideContent += ` (${slideIndex})`;
    }
    
    slideContent += '\n\n';
    slideContent += `**${section.title}の詳細内容を説明します**\n\n`;
    slideContent += content.trim();

    return slideContent;
  }

  private async createSingleSlide(
    section: any, 
    patternMapping?: PatternMapping, 
    order: number
  ): Promise<SlideDefinition> {
    const slideContent = this.generateSingleSlideContent(section, patternMapping);
    const layout = this.determineOptimalLayout(section.content, patternMapping);
    const styling = this.createContentSpecificStyling(section.content);

    return {
      id: `slide-${section.id}`,
      order,
      title: section.title,
      overviewStatement: this.generateOverviewStatement(section),
      contentSections: [{
        id: `${section.id}-content`,
        title: section.title,
        level: section.level,
        content: slideContent,
        type: section.type,
        estimatedTime: this.estimateSlideTime(section.content)
      }],
      layout,
      styling,
      animations: []
    };
  }

  private generateSingleSlideContent(section: any, patternMapping?: PatternMapping): string {
    let content = this.applyMarpDirectives(section, patternMapping);
    
    content += `## ${section.title}\n\n`;
    content += `**${this.generateOverviewStatement(section)}**\n\n`;
    
    // Apply pattern-specific formatting
    if (patternMapping) {
      content += this.applyPatternFormatting(section.content, patternMapping);
    } else {
      content += section.content;
    }

    return content;
  }

  private applyMarpDirectives(section: any, patternMapping?: PatternMapping): string {
    let directives = '';

    // Apply pattern-specific class
    if (patternMapping) {
      const patternClass = this.getPatternClass(patternMapping.selectedPattern.id);
      if (patternClass) {
        directives += `<!-- _class: ${patternClass} -->\n`;
      }
    }

    // Apply content-specific styling
    const contentAnalysis = this.analyzeContentLength(section.content);
    if (contentAnalysis.complexity === 'high') {
      directives += `<!-- _style: "padding: 40px 60px 45px 60px; font-size: 20px; line-height: 1.4;" -->\n`;
    } else if (contentAnalysis.lineCount > 12) {
      directives += `<!-- _class: split-layout -->\n`;
    }

    return directives;
  }

  private getPatternClass(patternId: string): string | null {
    const patternClassMap: Record<string, string> = {
      'comparison': 'split-layout',
      'number-emphasis': 'center-layout',
      'dashboard': 'grid-layout',
      'timeline': 'timeline-layout',
      'steps': 'steps-layout',
      'photo-visual': 'visual-layout',
      'storytelling': 'story-layout'
    };

    return patternClassMap[patternId] || null;
  }

  private applyPatternFormatting(content: string, patternMapping: PatternMapping): string {
    const pattern = patternMapping.selectedPattern;
    
    switch (pattern.id) {
      case 'number-emphasis':
        return this.formatNumberEmphasis(content);
      
      case 'comparison':
        return this.formatComparison(content);
      
      case 'steps':
        return this.formatSteps(content);
      
      case 'timeline':
        return this.formatTimeline(content);
      
      case 'dashboard':
        return this.formatDashboard(content);
      
      case 'photo-visual':
        return this.formatPhotoVisual(content);
      
      default:
        return content;
    }
  }

  private formatNumberEmphasis(content: string): string {
    // Find and emphasize numbers
    return content.replace(/(\d+[%億万千円ドル]*)/g, 
      '<span style="font-size: 36px; color: var(--primary-color); font-weight: bold;">$1</span>'
    );
  }

  private formatComparison(content: string): string {
    // Split content for comparison layout
    const sections = content.split(/vs|対比|比較/).map(s => s.trim());
    
    if (sections.length >= 2) {
      return `<div class="content-container">
<div class="split-left">

${sections[0]}

</div>

<div class="split-right">

${sections[1]}

</div>
</div>`;
    }
    
    return content;
  }

  private formatSteps(content: string): string {
    // Format step-by-step content
    return content.replace(/(\d+\.\s*[^\n]+)/g, 
      '<div class="step-item"><span class="step-number">$1</span></div>'
    );
  }

  private formatTimeline(content: string): string {
    // Create timeline formatting
    const timelineItems = content.split('\n').filter(line => 
      line.match(/\d{4}|\d+年|\d+月|Phase|フェーズ|ステップ/)
    );

    if (timelineItems.length > 0) {
      let timeline = '<div class="timeline">\n';
      timelineItems.forEach(item => {
        timeline += `<div class="timeline-item">${item}</div>\n`;
      });
      timeline += '</div>\n';
      
      return timeline + content;
    }
    
    return content;
  }

  private formatDashboard(content: string): string {
    // Create dashboard grid layout
    const metrics = content.split('\n').filter(line => 
      line.includes(':') || line.match(/\d+[%億万円]/)
    );

    if (metrics.length >= 4) {
      let dashboard = '<div class="dashboard-grid">\n';
      metrics.forEach(metric => {
        dashboard += `<div class="metric-card">${metric}</div>\n`;
      });
      dashboard += '</div>\n';
      
      return dashboard;
    }
    
    return content;
  }

  private formatPhotoVisual(content: string): string {
    // Apply background image formatting
    const imageMatches = content.match(/!\[.*?\]\((.*?)\)/);
    
    if (imageMatches) {
      const imagePath = imageMatches[1];
      const cleanContent = content.replace(/!\[.*?\]\(.*?\)/, '');
      
      return `<!-- _backgroundImage: url(${imagePath}) -->\n<!-- _style: "color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);" -->\n\n${cleanContent}`;
    }
    
    return content;
  }

  private determineOptimalLayout(content: string, patternMapping?: PatternMapping): LayoutDefinition {
    const analysis = this.analyzeContentLength(content);
    
    // Use pattern-specific layout if available
    if (patternMapping) {
      return this.getPatternLayout(patternMapping.selectedPattern.id);
    }

    // Determine layout based on content analysis
    if (analysis.needsSplit) {
      return this.createLayoutDefinition(LayoutPattern.SPLIT);
    } else if (analysis.complexity === 'high') {
      return this.createLayoutDefinition(LayoutPattern.GRID);
    } else {
      return this.createLayoutDefinition(LayoutPattern.STANDARD);
    }
  }

  private getPatternLayout(patternId: string): LayoutDefinition {
    const patternLayouts: Record<string, LayoutPattern> = {
      'comparison': LayoutPattern.SPLIT,
      'dashboard': LayoutPattern.GRID,
      'timeline': LayoutPattern.TIMELINE,
      'steps': LayoutPattern.FLOWCHART,
      'photo-visual': LayoutPattern.BACKGROUND,
      'center': LayoutPattern.CENTER,
      'table': LayoutPattern.TABLE
    };

    const layoutPattern = patternLayouts[patternId] || LayoutPattern.STANDARD;
    return this.createLayoutDefinition(layoutPattern);
  }

  private createLayoutDefinition(pattern: LayoutPattern): LayoutDefinition {
    const gridConfigs: Record<LayoutPattern, any> = {
      [LayoutPattern.STANDARD]: { columns: 1, rows: 1, gap: '0' },
      [LayoutPattern.SPLIT]: { columns: 2, rows: 1, gap: '2rem' },
      [LayoutPattern.CENTER]: { columns: 1, rows: 1, gap: '0' },
      [LayoutPattern.GRID]: { columns: 2, rows: 2, gap: '1.5rem' },
      [LayoutPattern.TABLE]: { columns: 1, rows: 1, gap: '0' },
      [LayoutPattern.TIMELINE]: { columns: 1, rows: 1, gap: '0' },
      [LayoutPattern.FLOWCHART]: { columns: 1, rows: 1, gap: '0' },
      [LayoutPattern.BACKGROUND]: { columns: 1, rows: 1, gap: '0' },
      [LayoutPattern.ACCORDION]: { columns: 1, rows: 1, gap: '0' },
      [LayoutPattern.CARD]: { columns: 3, rows: 2, gap: '1rem' },
      [LayoutPattern.DASHBOARD]: { columns: 3, rows: 2, gap: '1rem' }
    };

    return {
      pattern,
      grid: gridConfigs[pattern],
      spacing: {
        padding: pattern === LayoutPattern.CENTER ? '60px 40px' : '40px 60px',
        margin: '0',
        gap: gridConfigs[pattern].gap
      },
      responsive: {
        breakpoints: [],
        behavior: 'scale' as any
      }
    };
  }

  private createDefaultStyling(): StyleDefinition {
    return {
      colors: {
        primary: '#2c5aa0',
        secondary: '#f39800',
        background: '#ffffff',
        text: '#333333',
        accent: '#4ecdc4'
      },
      typography: {
        fontFamily: '"Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
        fontSize: `${this.BASE_FONT_SIZE}px`,
        fontWeight: '400',
        lineHeight: '1.6'
      },
      spacing: {
        padding: '40px 60px',
        margin: '0',
        gap: '1rem'
      },
      effects: {
        shadows: ['0 2px 4px rgba(0,0,0,0.1)'],
        borders: ['1px solid #e9ecef'],
        borderRadius: '4px'
      }
    };
  }

  private createContentSpecificStyling(content: string): StyleDefinition {
    const analysis = this.analyzeContentLength(content);
    const baseStyling = this.createDefaultStyling();

    // Adjust font size based on content density
    if (analysis.complexity === 'high') {
      baseStyling.typography.fontSize = '20px';
      baseStyling.typography.lineHeight = '1.4';
    } else if (analysis.lineCount > 15) {
      baseStyling.typography.fontSize = '21px';
      baseStyling.typography.lineHeight = '1.5';
    }

    // Adjust padding for content density
    if (analysis.needsSplit) {
      baseStyling.spacing.padding = '40px 60px 45px 60px';
    }

    return baseStyling;
  }

  private generateOverviewStatement(section: any): string {
    // Try to extract existing overview statement
    const boldMatches = section.content.match(/\*\*([^*]+)\*\*/);
    if (boldMatches && boldMatches[1].length > 20) {
      return boldMatches[1];
    }

    // Generate overview statement based on content
    const contentType = section.type;
    const title = section.title;

    const templates = {
      'numerical-data': `${title}の重要な数値とデータを詳しく解説します`,
      'structural-relationship': `${title}の構造と関係性について体系的に説明します`,
      'temporal-flow': `${title}の手順とプロセスを段階的に説明します`,
      'information-organization': `${title}に関する重要な情報を整理して説明します`,
      'emotional-experiential': `${title}に関する事例と体験を具体的に紹介します`
    };

    return templates[contentType] || `${title}について詳しく説明します`;
  }

  private estimateSlideTime(content: string): number {
    const wordCount = this.contentParser.countWords(content);
    return Math.max(2, Math.ceil(wordCount / 100)); // Roughly 100 words per minute
  }

  private createNavigationStructure(slides: SlideDefinition[]): NavigationStructure {
    return {
      type: 'linear',
      controls: [
        {
          type: 'button',
          position: 'bottom',
          style: this.createDefaultStyling()
        }
      ],
      shortcuts: [
        { key: 'ArrowRight', action: 'nextSlide', description: '次のスライド' },
        { key: 'ArrowLeft', action: 'prevSlide', description: '前のスライド' },
        { key: 'Home', action: 'firstSlide', description: '最初のスライド' },
        { key: 'End', action: 'lastSlide', description: '最後のスライド' }
      ]
    };
  }

  private createInteractions(slides: SlideDefinition[]): InteractionDefinition[] {
    return [
      {
        type: 'click',
        target: '.slide',
        action: 'nextSlide',
        feedback: {
          visual: {
            animation: {
              name: 'slideTransition',
              duration: 300,
              easing: 'ease-in-out'
            }
          }
        }
      }
    ];
  }

  // Generate the complete Marp markdown file
  generateMarpMarkdown(slideStructure: SlideStructure): string {
    let markdown = this.generateMarpHeader();
    
    slideStructure.slides.forEach((slide, index) => {
      if (index > 0) {
        markdown += '\n---\n\n';
      }
      markdown += this.generateSlideMarkdown(slide);
    });

    return markdown;
  }

  private generateMarpHeader(): string {
    const cssProperties = generateCSSCustomProperties(defaultDesignSystem);
    
    return `---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
backgroundImage: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4MCIgaGVpZ2h0PSI3MjAiIHZpZXdCb3g9IjAgMCAxMjgwIDcyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9zdmc+')
---

<style>
${cssProperties}

/* Marp-specific styling */
section {
  font-family: "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif;
  font-size: 22px;
  line-height: 1.6;
  color: var(--text-primary);
  padding: 40px 60px;
}

h1, h2, h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

h1 { font-size: 32px; }
h2 { font-size: 28px; }
h3 { font-size: 24px; }

.title-slide {
  text-align: center;
  padding: 60px 40px;
}

.split-layout {
  display: flex;
  gap: 2rem;
}

.split-left, .split-right {
  flex: 1;
}

.center-layout {
  text-align: center;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline-item {
  position: relative;
  padding: 1rem 0;
  border-left: 2px solid var(--primary-color);
  padding-left: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 1.5rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary-color);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.metric-card {
  background: var(--background-alt);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  text-align: center;
}

.step-item {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--background-alt);
  border-radius: 4px;
  border-left: 4px solid var(--primary-color);
}
</style>

`;
  }

  private generateSlideMarkdown(slide: SlideDefinition): string {
    return slide.contentSections.map(section => section.content).join('\n\n');
  }
}

interface ContentAnalysis {
  lineCount: number;
  characterCount: number;
  codeBlockCount: number;
  longLineCount: number;
  needsSplit: boolean;
  complexity: 'low' | 'medium' | 'high';
}