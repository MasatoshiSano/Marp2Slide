import { 
  MarkdownFile, 
  DraftStructure, 
  EssentialElements, 
  TOCItem, 
  DiscussionScope, 
  OverviewStatement, 
  InformationHierarchy, 
  ContentSection, 
  SectionRelationship, 
  TimeConstraints, 
  TimePhase 
} from '../types/index.js';
import { ContentParser, ParsedContent } from './ContentParser.js';

export class DraftStructureProcessor {
  private contentParser: ContentParser;

  constructor() {
    this.contentParser = new ContentParser();
  }

  async processDraftStructure(file: MarkdownFile): Promise<DraftStructure> {
    const parsedContent = this.contentParser.parseMarkdownFile(file);
    
    const essentialElements = this.extractEssentialElements(parsedContent);
    const informationHierarchy = this.extractInformationHierarchy(parsedContent);
    const overviewStatements = this.extractOverviewStatements(parsedContent);
    const timeConstraints = this.extractTimeConstraints(parsedContent);

    return {
      essentialElements,
      informationHierarchy,
      overviewStatements,
      timeConstraints
    };
  }

  private extractEssentialElements(parsedContent: ParsedContent): EssentialElements {
    // Extract title from the first section or document title
    const title = parsedContent.title || 'Untitled Presentation';

    // Extract table of contents
    const tableOfContents = this.extractTableOfContents(parsedContent);

    // Extract discussion scope (what to discuss vs not discuss)
    const discussionScope = this.extractDiscussionScope(parsedContent);

    // Extract summary
    const summary = this.extractSummary(parsedContent);

    return {
      title,
      tableOfContents,
      discussionScope,
      summary
    };
  }

  private extractTableOfContents(parsedContent: ParsedContent): TOCItem[] {
    const tocItems: TOCItem[] = [];
    
    // Look for explicit TOC section
    const tocSection = parsedContent.sections.find(
      section => 
        section.title.includes('目次') || 
        section.title.toLowerCase().includes('table of contents') ||
        section.title.toLowerCase().includes('toc')
    );

    if (tocSection) {
      // Parse explicit TOC
      const lines = tocSection.content.split('\n');
      let currentItem: Partial<TOCItem> | null = null;
      
      lines.forEach((line, index) => {
        const numberedMatch = line.match(/^\s*(\d+)\.\s+(.+)$/);
        const bulletMatch = line.match(/^\s*[-*]\s+(.+)$/);
        
        if (numberedMatch) {
          tocItems.push({
            title: numberedMatch[2].trim(),
            level: 1,
            page: parseInt(numberedMatch[1]) || index + 1,
            children: []
          });
        } else if (bulletMatch) {
          tocItems.push({
            title: bulletMatch[1].trim(),
            level: 1,
            page: index + 1,
            children: []
          });
        }
      });
    } else {
      // Generate TOC from section headers
      parsedContent.sections.forEach((section, index) => {
        if (section.level <= 2) { // Only include main sections
          tocItems.push({
            title: section.title,
            level: section.level,
            page: index + 1,
            children: []
          });
        }
      });
    }

    return tocItems;
  }

  private extractDiscussionScope(parsedContent: ParsedContent): DiscussionScope {
    const included: string[] = [];
    const excluded: string[] = [];

    // Look for discussion scope section
    const scopeSection = parsedContent.sections.find(
      section => 
        section.title.includes('話すこと') || 
        section.title.includes('話さないこと') ||
        section.title.includes('スコープ') ||
        section.content.includes('話すこと') ||
        section.content.includes('話さないこと')
    );

    if (scopeSection) {
      const content = scopeSection.content;
      const lines = content.split('\n');
      
      let currentMode: 'included' | 'excluded' | null = null;
      
      lines.forEach(line => {
        const trimmedLine = line.trim();
        
        // Check for section headers
        if (trimmedLine.includes('話すこと') && (trimmedLine.includes('✓') || trimmedLine.includes('○'))) {
          currentMode = 'included';
        } else if (trimmedLine.includes('話さないこと') && (trimmedLine.includes('✗') || trimmedLine.includes('×'))) {
          currentMode = 'excluded';
        } else if (trimmedLine.match(/^\s*[-*]\s+(.+)$/)) {
          // Extract bullet point content
          const match = trimmedLine.match(/^\s*[-*]\s+(.+)$/);
          if (match && currentMode) {
            const item = match[1].trim();
            if (currentMode === 'included') {
              included.push(item);
            } else {
              excluded.push(item);
            }
          }
        }
      });
    }

    // If no explicit scope section, infer from content
    if (included.length === 0 && excluded.length === 0) {
      parsedContent.sections.forEach(section => {
        if (section.level <= 2) {
          included.push(section.title);
        }
      });
    }

    return { included, excluded };
  }

  private extractSummary(parsedContent: ParsedContent): string {
    // Look for explicit summary section
    const summarySection = parsedContent.sections.find(
      section => 
        section.title.includes('まとめ') || 
        section.title.includes('総括') ||
        section.title.toLowerCase().includes('summary') ||
        section.title.toLowerCase().includes('conclusion')
    );

    if (summarySection) {
      return summarySection.content.trim();
    }

    // Generate summary from overview statements or main points
    const mainPoints = parsedContent.sections
      .filter(section => section.level <= 2)
      .map(section => section.title)
      .slice(0, 3);

    return `本プレゼンテーションでは、${mainPoints.join('、')}について説明します。`;
  }

  private extractInformationHierarchy(parsedContent: ParsedContent): InformationHierarchy {
    const sections = parsedContent.sections.map(section => ({
      ...section,
      type: this.determineContentType(section.content)
    }));

    const relationships = this.identifyRelationships(sections);

    return {
      sections,
      relationships
    };
  }

  private determineContentType(content: string): any {
    const contentLower = content.toLowerCase();
    
    // Determine content type based on keywords and patterns
    if (this.hasNumericalContent(content)) return 'numerical-data';
    if (this.hasStructuralContent(contentLower)) return 'structural-relationship';
    if (this.hasTemporalContent(contentLower)) return 'temporal-flow';
    if (this.hasOrganizationalContent(content)) return 'information-organization';
    if (this.hasEmotionalContent(contentLower)) return 'emotional-experiential';
    
    return 'information-organization';
  }

  private hasNumericalContent(content: string): boolean {
    return /\d+[%円億万]|KPI|指標|データ|統計/.test(content);
  }

  private hasStructuralContent(content: string): boolean {
    return /構造|関係|システム|組織|階層/.test(content);
  }

  private hasTemporalContent(content: string): boolean {
    return /ステップ|手順|プロセス|フロー|段階|時系列/.test(content);
  }

  private hasOrganizationalContent(content: string): boolean {
    return /一覧|リスト|チェック|要点|項目/.test(content) || 
           /^\s*[-*]\s+/.test(content) || 
           /^\s*\d+\.\s+/.test(content);
  }

  private hasEmotionalContent(content: string): boolean {
    return /事例|体験|ストーリー|成功|失敗|感動/.test(content);
  }

  private identifyRelationships(sections: ContentSection[]): SectionRelationship[] {
    const relationships: SectionRelationship[] = [];

    for (let i = 0; i < sections.length - 1; i++) {
      const currentSection = sections[i];
      const nextSection = sections[i + 1];

      // Determine relationship type based on content and structure
      let relationshipType: 'prerequisite' | 'builds-on' | 'contrasts-with' | 'supports' = 'builds-on';

      if (currentSection.title.includes('基本') || currentSection.title.includes('前提')) {
        relationshipType = 'prerequisite';
      } else if (this.isContrastingContent(currentSection.content, nextSection.content)) {
        relationshipType = 'contrasts-with';
      } else if (this.isSupportingContent(currentSection.content, nextSection.content)) {
        relationshipType = 'supports';
      }

      relationships.push({
        fromSection: currentSection.id,
        toSection: nextSection.id,
        relationshipType
      });
    }

    return relationships;
  }

  private isContrastingContent(content1: string, content2: string): boolean {
    const contrastKeywords = ['一方', '対して', '反対', '異なる', 'しかし', 'vs', '比較'];
    return contrastKeywords.some(keyword => 
      content1.includes(keyword) || content2.includes(keyword)
    );
  }

  private isSupportingContent(content1: string, content2: string): boolean {
    const supportKeywords = ['例えば', '具体的', '実際', '事例', 'ケース', '詳細'];
    return supportKeywords.some(keyword => 
      content2.includes(keyword)
    );
  }

  private extractOverviewStatements(parsedContent: ParsedContent): OverviewStatement[] {
    const overviewStatements: OverviewStatement[] = [];

    parsedContent.sections.forEach((section, index) => {
      const statement = this.findOverviewStatement(section.content);
      
      if (statement) {
        overviewStatements.push({
          slideId: section.id,
          statement,
          coreMessage: this.extractCoreMessage(statement),
          audienceBenefit: this.extractAudienceBenefit(statement)
        });
      } else {
        // Generate overview statement if not found
        const generatedStatement = this.generateOverviewStatement(section);
        overviewStatements.push({
          slideId: section.id,
          statement: generatedStatement,
          coreMessage: section.title,
          audienceBenefit: 'セクションの理解と実践的な知識の習得'
        });
      }
    });

    return overviewStatements;
  }

  private findOverviewStatement(content: string): string | null {
    // Look for bold text that might be overview statements
    const boldMatches = content.match(/\*\*([^*]+)\*\*/g);
    
    if (boldMatches) {
      // Find the longest bold statement (likely to be overview)
      const statements = boldMatches
        .map(match => match.replace(/\*\*/g, ''))
        .filter(text => text.length > 20); // Filter out short bold text

      if (statements.length > 0) {
        return statements.sort((a, b) => b.length - a.length)[0];
      }
    }

    // Look for sentences that describe what the section does
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.includes('説明します') || line.includes('示します') || line.includes('解説します')) {
        return line.trim();
      }
    }

    return null;
  }

  private extractCoreMessage(statement: string): string {
    // Extract key concepts from the statement
    const words = statement.split(/[、。，]/);
    return words[0].trim();
  }

  private extractAudienceBenefit(statement: string): string {
    // Extract what the audience will gain
    if (statement.includes('理解')) return '理解の向上';
    if (statement.includes('習得')) return 'スキルの習得';
    if (statement.includes('改善')) return '改善方法の習得';
    if (statement.includes('効率')) return '効率性の向上';
    
    return '知識とスキルの向上';
  }

  private generateOverviewStatement(section: ContentSection): string {
    const templates = [
      `このセクションでは、${section.title}について詳しく説明し、実践的な理解を深めます。`,
      `${section.title}の重要なポイントと、それを活用する方法について解説します。`,
      `${section.title}に関する基本概念から応用まで、体系的に学習します。`,
      `${section.title}の実装方法と、成功のためのベストプラクティスを紹介します。`
    ];

    // Choose template based on content type
    let templateIndex = 0;
    if (section.content.includes('方法') || section.content.includes('手順')) templateIndex = 1;
    if (section.content.includes('基本') || section.content.includes('概念')) templateIndex = 2;
    if (section.content.includes('実装') || section.content.includes('実際')) templateIndex = 3;

    return templates[templateIndex];
  }

  private extractTimeConstraints(parsedContent: ParsedContent): TimeConstraints {
    // Look for time-related information in the content
    const timeSection = parsedContent.sections.find(
      section => 
        section.title.includes('時間') || 
        section.title.includes('配分') ||
        section.content.includes('80分') ||
        section.content.includes('Phase')
    );

    if (timeSection) {
      return this.parseTimeConstraints(timeSection.content);
    }

    // Default 80-minute structure
    return this.getDefault80MinuteStructure();
  }

  private parseTimeConstraints(content: string): TimeConstraints {
    const phases: TimePhase[] = [];
    let totalTime = 80; // Default

    // Look for total time
    const totalTimeMatch = content.match(/(\d+)分/);
    if (totalTimeMatch) {
      totalTime = parseInt(totalTimeMatch[1]);
    }

    // Parse phases
    const phaseMatches = content.match(/Phase\s*\d+[^】]*】[^```]*```([^```]*)```/g);
    
    if (phaseMatches) {
      phaseMatches.forEach((phaseText, index) => {
        const name = this.extractPhaseName(phaseText);
        const duration = this.extractPhaseDuration(phaseText);
        const activities = this.extractPhaseActivities(phaseText);

        phases.push({
          name,
          duration,
          activities
        });
      });
    } else {
      // Default phases if not found
      return this.getDefault80MinuteStructure();
    }

    return {
      totalTime,
      phases
    };
  }

  private extractPhaseName(phaseText: string): string {
    const match = phaseText.match(/Phase\s*\d+:\s*([^（】]+)/);
    return match ? match[1].trim() : 'Unknown Phase';
  }

  private extractPhaseDuration(phaseText: string): number {
    const match = phaseText.match(/（(\d+)分）/);
    return match ? parseInt(match[1]) : 20;
  }

  private extractPhaseActivities(phaseText: string): string[] {
    const activities: string[] = [];
    const lines = phaseText.split('\n');
    
    lines.forEach(line => {
      const activityMatch = line.match(/^\d+-\d+分:\s*(.+)$/);
      if (activityMatch) {
        activities.push(activityMatch[1].trim());
      }
    });

    return activities;
  }

  private getDefault80MinuteStructure(): TimeConstraints {
    return {
      totalTime: 80,
      phases: [
        {
          name: '情報収集',
          duration: 30,
          activities: [
            '3-5-1ルールで主要情報源特定',
            '核となるデータ・事例収集',
            '80%確信度に到達'
          ]
        },
        {
          name: '構成・執筆',
          duration: 40,
          activities: [
            '必須4要素の骨組み作成',
            '概要文の作成',
            '自由セクションの執筆',
            '全体の流れと論理性確認'
          ]
        },
        {
          name: '調整・完成',
          duration: 10,
          activities: [
            '概要文の最終調整',
            '必須要素の最終チェック'
          ]
        }
      ]
    };
  }

  // Validate the extracted draft structure
  validateDraftStructure(structure: DraftStructure): DraftValidationResult {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check essential elements
    if (!structure.essentialElements.title || structure.essentialElements.title.trim().length === 0) {
      issues.push('タイトルが設定されていません');
    }

    if (structure.essentialElements.tableOfContents.length === 0) {
      issues.push('目次が作成されていません');
    }

    if (structure.essentialElements.discussionScope.included.length === 0) {
      issues.push('話すことが明確でありません');
    }

    if (!structure.essentialElements.summary || structure.essentialElements.summary.trim().length < 20) {
      issues.push('まとめが不十分です');
    }

    // Check overview statements
    const missingOverviews = structure.overviewStatements.filter(
      overview => !overview.statement || overview.statement.trim().length < 10
    );

    if (missingOverviews.length > 0) {
      issues.push(`${missingOverviews.length}個のセクションで概要文が不足しています`);
    }

    // Check time constraints
    if (structure.timeConstraints.totalTime > 80) {
      recommendations.push('80分制限を超過しています。内容の削減を検討してください');
    }

    // Generate recommendations
    if (structure.informationHierarchy.sections.length > 8) {
      recommendations.push('セクション数が多すぎます。統合を検討してください');
    }

    if (structure.overviewStatements.length < structure.informationHierarchy.sections.length) {
      recommendations.push('すべてのセクションに概要文を追加してください');
    }

    return {
      isValid: issues.length === 0,
      issues,
      recommendations,
      completeness: this.calculateCompleteness(structure)
    };
  }

  private calculateCompleteness(structure: DraftStructure): number {
    let score = 0;
    const maxScore = 100;

    // Essential elements (40 points)
    if (structure.essentialElements.title) score += 10;
    if (structure.essentialElements.tableOfContents.length > 0) score += 10;
    if (structure.essentialElements.discussionScope.included.length > 0) score += 10;
    if (structure.essentialElements.summary && structure.essentialElements.summary.length > 20) score += 10;

    // Overview statements (30 points)
    const overviewRatio = structure.overviewStatements.length / Math.max(structure.informationHierarchy.sections.length, 1);
    score += Math.min(30, overviewRatio * 30);

    // Information hierarchy (20 points)
    if (structure.informationHierarchy.sections.length > 0) score += 10;
    if (structure.informationHierarchy.relationships.length > 0) score += 10;

    // Time constraints (10 points)
    if (structure.timeConstraints.totalTime <= 80) score += 5;
    if (structure.timeConstraints.phases.length >= 3) score += 5;

    return Math.round((score / maxScore) * 100);
  }

  // Generate a template based on the draft structure
  generateDraftTemplate(structure: DraftStructure): string {
    let template = `# ${structure.essentialElements.title}\n\n`;
    
    template += `## 目次\n`;
    structure.essentialElements.tableOfContents.forEach((item, index) => {
      template += `${index + 1}. ${item.title}\n`;
    });
    template += `\n---\n\n`;

    template += `## このスライドで話すこと・話さないこと\n\n`;
    template += `### 話すこと ✓\n`;
    structure.essentialElements.discussionScope.included.forEach(item => {
      template += `- ${item}\n`;
    });
    template += `\n### 話さないこと ✗\n`;
    structure.essentialElements.discussionScope.excluded.forEach(item => {
      template += `- ${item}\n`;
    });
    template += `\n---\n\n`;

    // Add sections with overview statements
    structure.informationHierarchy.sections.forEach(section => {
      const overview = structure.overviewStatements.find(o => o.slideId === section.id);
      
      template += `## ${section.title}\n\n`;
      if (overview) {
        template += `**${overview.statement}**\n\n`;
      }
      template += `${section.content}\n\n---\n\n`;
    });

    template += `## まとめ\n\n`;
    template += `**${structure.essentialElements.summary}**\n\n`;

    return template;
  }
}

export interface DraftValidationResult {
  isValid: boolean;
  issues: string[];
  recommendations: string[];
  completeness: number; // Percentage
}