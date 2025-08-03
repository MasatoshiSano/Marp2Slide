import { 
  MarkdownFile, 
  PresentationMapping, 
  ContentType, 
  PresentationPattern, 
  PatternMapping 
} from '../types/index.js';
import { ContentParser, ParsedContent } from './ContentParser.js';
import { 
  presentationPatterns, 
  patternSelectionWeights, 
  contentAnalysisKeywords, 
  getPatternById, 
  getPatternsByCategory, 
  getCompatiblePatterns, 
  getFallbackPatterns 
} from '../config/presentation-patterns.js';

export class PatternSelectionProcessor {
  private contentParser: ContentParser;

  constructor() {
    this.contentParser = new ContentParser();
  }

  async processPatternSelection(file: MarkdownFile): Promise<PresentationMapping> {
    const parsedContent = this.contentParser.parseMarkdownFile(file);
    
    const contentTypes = this.analyzeContentTypes(parsedContent);
    const selectedPatterns = this.selectOptimalPatterns(parsedContent, contentTypes);
    const patternMappings = this.createPatternMappings(parsedContent, selectedPatterns);

    return {
      contentTypes,
      selectedPatterns,
      patternMappings
    };
  }

  private analyzeContentTypes(parsedContent: ParsedContent): ContentType[] {
    const contentTypes = new Set<ContentType>();
    
    parsedContent.sections.forEach(section => {
      const sectionContent = `${section.title} ${section.content}`.toLowerCase();
      
      // Analyze each content type
      Object.entries(contentAnalysisKeywords).forEach(([type, keywords]) => {
        const matchCount = keywords.filter(keyword => 
          sectionContent.includes(keyword.toLowerCase())
        ).length;
        
        // If significant keyword matches found, add content type
        if (matchCount >= 2) {
          contentTypes.add(type as ContentType);
        }
      });

      // Additional pattern-based analysis
      const patternBasedType = this.analyzeContentPatterns(section.content);
      if (patternBasedType) {
        contentTypes.add(patternBasedType);
      }
    });

    // Ensure at least one content type is identified
    if (contentTypes.size === 0) {
      contentTypes.add(ContentType.INFORMATION_ORGANIZATION);
    }

    return Array.from(contentTypes);
  }

  private analyzeContentPatterns(content: string): ContentType | null {
    // Check for numerical data patterns
    const numericalPatterns = [
      /\d+[%％]/g,                    // Percentages
      /\d+([万億千百十]|million|billion)/g, // Large numbers
      /\d+:\d+/g,                     // Ratios
      /\$\d+|\d+円|\d+ドル/g,         // Currency
      /KPI|ROI|売上|利益|コスト/gi,   // Business metrics
    ];
    
    const numericalMatches = numericalPatterns.reduce((total, pattern) => {
      return total + (content.match(pattern) || []).length;
    }, 0);
    
    if (numericalMatches >= 3) {
      return ContentType.NUMERICAL_DATA;
    }

    // Check for structural patterns
    if (content.match(/```mermaid|graph|flowchart|diagram/gi)) {
      return ContentType.STRUCTURAL_RELATIONSHIP;
    }

    // Check for temporal patterns
    const temporalPatterns = [
      /step\s*\d+|ステップ\d+/gi,
      /phase\s*\d+|フェーズ\d+/gi,
      /\d+年\d+月|\d+\/\d+/g,
      /before|after|前|後|次に|その後/gi
    ];
    
    const temporalMatches = temporalPatterns.reduce((total, pattern) => {
      return total + (content.match(pattern) || []).length;
    }, 0);
    
    if (temporalMatches >= 2) {
      return ContentType.TEMPORAL_FLOW;
    }

    // Check for organizational patterns
    if (content.match(/^\s*[-*+]\s+/gm) || content.match(/^\s*\d+\.\s+/gm)) {
      return ContentType.INFORMATION_ORGANIZATION;
    }

    // Check for emotional/experiential patterns
    if (content.match(/事例|ケース|体験|ストーリー|成功|失敗|感動/gi)) {
      return ContentType.EMOTIONAL_EXPERIENTIAL;
    }

    return null;
  }

  private selectOptimalPatterns(parsedContent: ParsedContent, contentTypes: ContentType[]): PresentationPattern[] {
    const selectedPatterns: PresentationPattern[] = [];
    
    // For each content type, select the most appropriate patterns
    contentTypes.forEach(contentType => {
      const candidatePatterns = getPatternsByCategory(contentType);
      
      // Score each pattern based on content analysis
      const scoredPatterns = candidatePatterns.map(pattern => ({
        pattern,
        score: this.scorePattern(pattern, parsedContent, contentType)
      }));

      // Sort by score and select top patterns
      scoredPatterns.sort((a, b) => b.score - a.score);
      
      // Add top 2-3 patterns for each content type
      const topPatterns = scoredPatterns.slice(0, 3).map(sp => sp.pattern);
      selectedPatterns.push(...topPatterns);
    });

    // Remove duplicates and return
    return Array.from(new Set(selectedPatterns));
  }

  private scorePattern(pattern: PresentationPattern, parsedContent: ParsedContent, contentType: ContentType): number {
    let score = 0;

    // Base score from pattern effectiveness
    score += pattern.effectiveness * patternSelectionWeights.effectiveness;

    // Content type match score
    if (pattern.category === contentType) {
      score += 10 * patternSelectionWeights.contentTypeMatch;
    }

    // Use case relevance score
    const contentText = parsedContent.sections.map(s => `${s.title} ${s.content}`).join(' ').toLowerCase();
    const relevantUseCases = pattern.useCases.filter(useCase => 
      contentText.includes(useCase.toLowerCase())
    );
    score += relevantUseCases.length * 2 * patternSelectionWeights.useCaseRelevance;

    // Implementation complexity penalty (simpler is better)
    const complexityScore = this.assessImplementationComplexity(pattern);
    score -= complexityScore * patternSelectionWeights.implementationComplexity;

    // Additional scoring based on content analysis
    score += this.analyzeContentSpecificFit(pattern, parsedContent);

    return score;
  }

  private assessImplementationComplexity(pattern: PresentationPattern): number {
    // Assess complexity based on Marp implementation
    const implementation = pattern.marpImplementation.toLowerCase();
    
    let complexity = 0;
    
    if (implementation.includes('mermaid')) complexity += 3;
    if (implementation.includes('javascript')) complexity += 4;
    if (implementation.includes('grid')) complexity += 2;
    if (implementation.includes('flex')) complexity += 2;
    if (implementation.includes('animation')) complexity += 3;
    if (implementation.includes('svg')) complexity += 3;
    
    return complexity;
  }

  private analyzeContentSpecificFit(pattern: PresentationPattern, parsedContent: ParsedContent): number {
    let fitScore = 0;
    const allContent = parsedContent.sections.map(s => `${s.title} ${s.content}`).join(' ').toLowerCase();

    // Pattern-specific analysis
    switch (pattern.id) {
      case 'number-emphasis':
        fitScore += (allContent.match(/\d+[%億万円]/g) || []).length * 2;
        break;
      
      case 'comparison':
        if (allContent.includes('vs') || allContent.includes('比較') || allContent.includes('対比')) {
          fitScore += 5;
        }
        break;
      
      case 'steps':
        fitScore += (allContent.match(/ステップ|手順|段階/g) || []).length * 2;
        break;
      
      case 'timeline':
        fitScore += (allContent.match(/時系列|タイムライン|履歴/g) || []).length * 2;
        break;
      
      case 'photo-visual':
        fitScore += (allContent.match(/画像|写真|図|ビジュアル/g) || []).length * 2;
        break;
      
      case 'storytelling':
        fitScore += (allContent.match(/事例|ストーリー|体験|物語/g) || []).length * 2;
        break;
      
      case 'table':
        if (parsedContent.metadata.codeBlockCount > 0 || allContent.includes('|')) {
          fitScore += 3;
        }
        break;
      
      case 'checklist':
        fitScore += (allContent.match(/チェック|確認|要件|項目/g) || []).length * 1.5;
        break;
    }

    return fitScore;
  }

  private createPatternMappings(parsedContent: ParsedContent, selectedPatterns: PresentationPattern[]): PatternMapping[] {
    const mappings: PatternMapping[] = [];

    parsedContent.sections.forEach(section => {
      const sectionContent = `${section.title} ${section.content}`;
      
      // Find the best pattern for this section
      const patternScores = selectedPatterns.map(pattern => ({
        pattern,
        score: this.scoreSectionPatternFit(section, pattern, sectionContent)
      }));

      patternScores.sort((a, b) => b.score - a.score);
      
      const bestPattern = patternScores[0]?.pattern;
      const alternatives = patternScores.slice(1, 4).map(ps => ps.pattern);

      if (bestPattern) {
        mappings.push({
          sectionId: section.id,
          selectedPattern: bestPattern,
          rationale: this.generateRationale(section, bestPattern),
          alternatives,
          confidence: this.calculateConfidence(patternScores[0].score, patternScores[1]?.score || 0)
        });
      }
    });

    return mappings;
  }

  private scoreSectionPatternFit(section: any, pattern: PresentationPattern, sectionContent: string): number {
    let score = pattern.effectiveness;

    // Content type match
    const sectionType = this.analyzeContentPatterns(sectionContent);
    if (sectionType === pattern.category) {
      score += 5;
    }

    // Keyword relevance
    const keywordMatches = pattern.useCases.filter(useCase =>
      sectionContent.toLowerCase().includes(useCase.toLowerCase())
    ).length;
    score += keywordMatches * 2;

    // Section-specific considerations
    if (section.title.includes('まとめ') && pattern.id === 'bullet-list') {
      score += 3;
    }
    
    if (section.title.includes('比較') && pattern.id === 'comparison') {
      score += 5;
    }
    
    if (section.title.includes('手順') && pattern.id === 'steps') {
      score += 5;
    }

    return score;
  }

  private generateRationale(section: any, pattern: PresentationPattern): string {
    const reasons: string[] = [];

    if (pattern.category.includes('numerical') && section.content.match(/\d+[%億万円]/)) {
      reasons.push('数値データが含まれているため');
    }

    if (pattern.category.includes('temporal') && section.content.match(/ステップ|手順|段階/)) {
      reasons.push('手順や段階的な説明が含まれているため');
    }

    if (pattern.category.includes('structural') && section.content.match(/構造|関係|システム/)) {
      reasons.push('構造や関係性の説明が含まれているため');
    }

    if (pattern.category.includes('organization') && section.content.match(/^\s*[-*]\s+/m)) {
      reasons.push('リスト形式の情報整理が適しているため');
    }

    if (pattern.category.includes('experiential') && section.content.match(/事例|体験|ストーリー/)) {
      reasons.push('事例や体験に基づく内容のため');
    }

    // Use case relevance
    const relevantUseCases = pattern.useCases.filter(useCase =>
      section.content.toLowerCase().includes(useCase.toLowerCase())
    );
    
    if (relevantUseCases.length > 0) {
      reasons.push(`${relevantUseCases.join('、')}の用途に適合するため`);
    }

    if (reasons.length === 0) {
      reasons.push('コンテンツの性質と表現方法が適合するため');
    }

    return reasons.join('、');
  }

  private calculateConfidence(topScore: number, secondScore: number): number {
    if (secondScore === 0) return 1.0;
    
    const scoreDifference = topScore - secondScore;
    const confidence = Math.min(1.0, scoreDifference / topScore);
    
    return Math.round(confidence * 100) / 100;
  }

  // Optimize pattern selection based on overall presentation flow
  optimizePatternFlow(mappings: PatternMapping[]): PatternMapping[] {
    const optimizedMappings = [...mappings];

    // Ensure variety in patterns
    this.ensurePatternVariety(optimizedMappings);
    
    // Check for pattern compatibility
    this.optimizePatternCompatibility(optimizedMappings);
    
    // Balance complexity across presentation
    this.balanceComplexity(optimizedMappings);

    return optimizedMappings;
  }

  private ensurePatternVariety(mappings: PatternMapping[]): void {
    const patternUsage = new Map<string, number>();
    
    // Count pattern usage
    mappings.forEach(mapping => {
      const count = patternUsage.get(mapping.selectedPattern.id) || 0;
      patternUsage.set(mapping.selectedPattern.id, count + 1);
    });

    // Replace overused patterns with alternatives
    mappings.forEach(mapping => {
      const usage = patternUsage.get(mapping.selectedPattern.id) || 0;
      
      if (usage > Math.ceil(mappings.length / 3) && mapping.alternatives.length > 0) {
        const newPattern = mapping.alternatives[0];
        mapping.selectedPattern = newPattern;
        mapping.rationale += '（パターンの多様性確保のため調整）';
        
        // Update usage count
        patternUsage.set(mapping.selectedPattern.id, usage - 1);
        const newCount = patternUsage.get(newPattern.id) || 0;
        patternUsage.set(newPattern.id, newCount + 1);
      }
    });
  }

  private optimizePatternCompatibility(mappings: PatternMapping[]): void {
    for (let i = 0; i < mappings.length - 1; i++) {
      const currentMapping = mappings[i];
      const nextMapping = mappings[i + 1];
      
      // Check if patterns work well together
      const compatiblePatterns = getCompatiblePatterns(currentMapping.selectedPattern.id);
      const isCompatible = compatiblePatterns.some(p => p.id === nextMapping.selectedPattern.id);
      
      if (!isCompatible && nextMapping.alternatives.length > 0) {
        // Try to find a compatible alternative
        const compatibleAlternative = nextMapping.alternatives.find(alt =>
          compatiblePatterns.some(cp => cp.id === alt.id)
        );
        
        if (compatibleAlternative) {
          nextMapping.selectedPattern = compatibleAlternative;
          nextMapping.rationale += '（前セクションとの連携を考慮して調整）';
        }
      }
    }
  }

  private balanceComplexity(mappings: PatternMapping[]): void {
    const complexityScores = mappings.map(mapping => 
      this.assessImplementationComplexity(mapping.selectedPattern)
    );
    
    const avgComplexity = complexityScores.reduce((a, b) => a + b, 0) / complexityScores.length;
    
    // If overall complexity is too high, simplify some patterns
    if (avgComplexity > 2.5) {
      mappings.forEach(mapping => {
        const complexity = this.assessImplementationComplexity(mapping.selectedPattern);
        
        if (complexity > 3 && mapping.alternatives.length > 0) {
          const simplerAlternative = mapping.alternatives.find(alt =>
            this.assessImplementationComplexity(alt) < complexity
          );
          
          if (simplerAlternative) {
            mapping.selectedPattern = simplerAlternative;
            mapping.rationale += '（実装の簡素化のため調整）';
          }
        }
      });
    }
  }

  // Generate a comprehensive pattern selection report
  generatePatternReport(mapping: PresentationMapping): PatternSelectionReport {
    const contentTypeAnalysis = this.analyzeContentTypeDistribution(mapping);
    const patternEffectivenessAnalysis = this.analyzePatternEffectiveness(mapping);
    const recommendationsAndWarnings = this.generateRecommendations(mapping);

    return {
      summary: this.generateSummary(mapping),
      contentTypeAnalysis,
      patternEffectivenessAnalysis,
      patternMappings: mapping.patternMappings,
      recommendations: recommendationsAndWarnings.recommendations,
      warnings: recommendationsAndWarnings.warnings,
      implementationNotes: this.generateImplementationNotes(mapping)
    };
  }

  private generateSummary(mapping: PresentationMapping): string {
    const totalSections = mapping.patternMappings.length;
    const uniquePatterns = new Set(mapping.patternMappings.map(m => m.selectedPattern.id)).size;
    const avgConfidence = mapping.patternMappings.reduce((sum, m) => sum + m.confidence, 0) / totalSections;

    return `${totalSections}個のセクションに対して${uniquePatterns}種類のプレゼンテーションパターンを選択しました。平均適合度: ${(avgConfidence * 100).toFixed(1)}%`;
  }

  private analyzeContentTypeDistribution(mapping: PresentationMapping): Record<string, number> {
    const distribution: Record<string, number> = {};
    
    mapping.contentTypes.forEach(type => {
      const count = mapping.patternMappings.filter(m => m.selectedPattern.category === type).length;
      distribution[type] = count;
    });

    return distribution;
  }

  private analyzePatternEffectiveness(mapping: PresentationMapping): Record<string, number> {
    const effectiveness: Record<string, number> = {};
    
    mapping.patternMappings.forEach(m => {
      effectiveness[m.selectedPattern.name] = m.selectedPattern.effectiveness;
    });

    return effectiveness;
  }

  private generateRecommendations(mapping: PresentationMapping): {recommendations: string[], warnings: string[]} {
    const recommendations: string[] = [];
    const warnings: string[] = [];

    // Check pattern variety
    const patternCounts = new Map<string, number>();
    mapping.patternMappings.forEach(m => {
      const count = patternCounts.get(m.selectedPattern.id) || 0;
      patternCounts.set(m.selectedPattern.id, count + 1);
    });

    const overusedPatterns = Array.from(patternCounts.entries())
      .filter(([_, count]) => count > Math.ceil(mapping.patternMappings.length / 3));

    if (overusedPatterns.length > 0) {
      warnings.push(`一部のパターン（${overusedPatterns.map(([id, _]) => id).join('、')}）が多用されています。バリエーションを考慮してください。`);
    }

    // Check confidence levels
    const lowConfidenceMappings = mapping.patternMappings.filter(m => m.confidence < 0.6);
    if (lowConfidenceMappings.length > 0) {
      warnings.push(`${lowConfidenceMappings.length}個のセクションでパターン選択の信頼度が低くなっています。代替案を検討してください。`);
    }

    // Generate positive recommendations
    const highEffectivenessPatterns = mapping.patternMappings.filter(m => m.selectedPattern.effectiveness >= 8);
    if (highEffectivenessPatterns.length > 0) {
      recommendations.push('効果的なパターンが適切に選択されています。視覚的インパクトの強いプレゼンテーションが期待できます。');
    }

    const balancedTypes = mapping.contentTypes.length >= 3;
    if (balancedTypes) {
      recommendations.push('多様なコンテンツタイプが検出されており、バランスの取れたプレゼンテーション構成となっています。');
    }

    return { recommendations, warnings };
  }

  private generateImplementationNotes(mapping: PresentationMapping): string[] {
    const notes: string[] = [];

    mapping.patternMappings.forEach(m => {
      const pattern = m.selectedPattern;
      
      if (pattern.marpImplementation.includes('mermaid')) {
        notes.push(`${pattern.name}: Mermaid図表の生成が必要です`);
      }
      
      if (pattern.marpImplementation.includes('grid')) {
        notes.push(`${pattern.name}: CSSグリッドレイアウトの実装が必要です`);
      }
      
      if (pattern.marpImplementation.includes('![bg]')) {
        notes.push(`${pattern.name}: 背景画像の準備が必要です`);
      }
    });

    return Array.from(new Set(notes));
  }
}

export interface PatternSelectionReport {
  summary: string;
  contentTypeAnalysis: Record<string, number>;
  patternEffectivenessAnalysis: Record<string, number>;
  patternMappings: PatternMapping[];
  recommendations: string[];
  warnings: string[];
  implementationNotes: string[];
}