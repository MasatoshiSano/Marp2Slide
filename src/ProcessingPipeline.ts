import { 
  MarkdownFile, 
  HTMLSlideshow, 
  ValidationResult, 
  ProcessingStatus, 
  ProcessingStage, 
  ProcessedContent,
  ProcessingError,
  ProcessingWarning,
  ErrorCode
} from './types/index.js';

import { FileProcessor } from './processors/FileProcessor.js';
import { ContentParser } from './processors/ContentParser.js';
import { IdeaAnalysisProcessor } from './processors/IdeaAnalysisProcessor.js';
import { DraftStructureProcessor } from './processors/DraftStructureProcessor.js';
import { PatternSelectionProcessor } from './processors/PatternSelectionProcessor.js';
import { MarpGenerator } from './processors/MarpGenerator.js';
import { HTMLConverter } from './processors/HTMLConverter.js';

export class ProcessingPipeline {
  private fileProcessor: FileProcessor;
  private contentParser: ContentParser;
  private ideaAnalysisProcessor: IdeaAnalysisProcessor;
  private draftStructureProcessor: DraftStructureProcessor;
  private patternSelectionProcessor: PatternSelectionProcessor;
  private marpGenerator: MarpGenerator;
  private htmlConverter: HTMLConverter;

  private currentStage: ProcessingStage = ProcessingStage.IDEA_ANALYSIS;
  private progress: number = 0;
  private errors: ProcessingError[] = [];
  private warnings: ProcessingWarning[] = [];
  private processedContent: ProcessedContent | null = null;

  constructor() {
    this.fileProcessor = new FileProcessor();
    this.contentParser = new ContentParser();
    this.ideaAnalysisProcessor = new IdeaAnalysisProcessor();
    this.draftStructureProcessor = new DraftStructureProcessor();
    this.patternSelectionProcessor = new PatternSelectionProcessor();
    this.marpGenerator = new MarpGenerator();
    this.htmlConverter = new HTMLConverter();
  }

  async processFiles(inputPath: string): Promise<HTMLSlideshow> {
    try {
      this.reset();
      
      // Stage 1: File Processing and Validation
      this.updateProgress(ProcessingStage.IDEA_ANALYSIS, 5);
      const files = await this.fileProcessor.processFiles(inputPath);
      
      if (files.length === 0) {
        throw new Error('No valid markdown files found in the specified directory');
      }

      // Validate file structure
      const validationResult = this.fileProcessor.validateInputDirectory(inputPath);
      if (!validationResult.isValid) {
        throw new Error(`File validation failed: ${validationResult.errors.map(e => e.message).join(', ')}`);
      }

      // Initialize processed content
      this.processedContent = {
        metadata: {
          id: `processing-${Date.now()}`,
          title: 'Processed Content',
          created: new Date(),
          lastModified: new Date(),
          processingStage: ProcessingStage.IDEA_ANALYSIS,
          version: '1.0.0'
        }
      };

      // Stage 1: Idea Analysis
      this.updateProgress(ProcessingStage.IDEA_ANALYSIS, 15);
      await this.processIdeaAnalysis(files[0]);

      // Stage 2: Draft Structure
      this.updateProgress(ProcessingStage.DRAFT_STRUCTURE, 30);
      await this.processDraftStructure(files[1]);

      // Stage 3: Pattern Selection
      this.updateProgress(ProcessingStage.PATTERN_SELECTION, 50);
      await this.processPatternSelection(files[2]);

      // Stage 4: Marp Generation
      this.updateProgress(ProcessingStage.MARP_GENERATION, 70);
      await this.processMarpGeneration(files[3]);

      // Stage 5: HTML Conversion
      this.updateProgress(ProcessingStage.HTML_CONVERSION, 85);
      const htmlSlideshow = await this.processHTMLConversion(files[4]);

      this.updateProgress(ProcessingStage.HTML_CONVERSION, 100);
      
      return htmlSlideshow;

    } catch (error) {
      this.addError(this.currentStage, ErrorCode.VALIDATION_FAILED, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  private async processIdeaAnalysis(file: MarkdownFile): Promise<void> {
    try {
      this.currentStage = ProcessingStage.IDEA_ANALYSIS;
      
      const ideaAnalysis = await this.ideaAnalysisProcessor.processIdeaAnalysis(file);
      
      if (!this.processedContent) {
        throw new Error('Processed content not initialized');
      }
      
      this.processedContent.ideaFramework = ideaAnalysis;
      this.processedContent.metadata.processingStage = ProcessingStage.IDEA_ANALYSIS;

      // Validate idea analysis
      if (!ideaAnalysis.principles || ideaAnalysis.principles.length === 0) {
        this.addWarning(ProcessingStage.IDEA_ANALYSIS, 'MISSING_PRINCIPLES', 'No principles extracted from idea analysis');
      }

      if (!ideaAnalysis.criticalThinking || 
          (ideaAnalysis.criticalThinking.technicalAspects.length === 0 && 
           ideaAnalysis.criticalThinking.businessAspects.length === 0 && 
           ideaAnalysis.criticalThinking.userExperienceAspects.length === 0)) {
        this.addWarning(ProcessingStage.IDEA_ANALYSIS, 'INCOMPLETE_FRAMEWORK', 'Critical thinking framework is incomplete');
      }

    } catch (error) {
      this.addError(ProcessingStage.IDEA_ANALYSIS, ErrorCode.VALIDATION_FAILED, 
        `Idea analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private async processDraftStructure(file: MarkdownFile): Promise<void> {
    try {
      this.currentStage = ProcessingStage.DRAFT_STRUCTURE;
      
      const draftStructure = await this.draftStructureProcessor.processDraftStructure(file);
      
      if (!this.processedContent) {
        throw new Error('Processed content not initialized');
      }
      
      this.processedContent.draftStructure = draftStructure;
      this.processedContent.metadata.processingStage = ProcessingStage.DRAFT_STRUCTURE;

      // Validate draft structure
      const validation = this.draftStructureProcessor.validateDraftStructure(draftStructure);
      
      if (!validation.isValid) {
        validation.issues.forEach(issue => {
          this.addError(ProcessingStage.DRAFT_STRUCTURE, ErrorCode.MISSING_REQUIRED_ELEMENTS, issue);
        });
      }

      validation.recommendations.forEach(recommendation => {
        this.addWarning(ProcessingStage.DRAFT_STRUCTURE, 'STRUCTURE_RECOMMENDATION', recommendation);
      });

      if (validation.completeness < 80) {
        this.addWarning(ProcessingStage.DRAFT_STRUCTURE, 'LOW_COMPLETENESS', 
          `Draft structure completeness is ${validation.completeness}%. Consider improving the structure.`);
      }

    } catch (error) {
      this.addError(ProcessingStage.DRAFT_STRUCTURE, ErrorCode.VALIDATION_FAILED, 
        `Draft structure processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private async processPatternSelection(file: MarkdownFile): Promise<void> {
    try {
      this.currentStage = ProcessingStage.PATTERN_SELECTION;
      
      const presentationMapping = await this.patternSelectionProcessor.processPatternSelection(file);
      
      if (!this.processedContent) {
        throw new Error('Processed content not initialized');
      }
      
      this.processedContent.presentationMapping = presentationMapping;
      this.processedContent.metadata.processingStage = ProcessingStage.PATTERN_SELECTION;

      // Optimize pattern mappings
      const optimizedMappings = this.patternSelectionProcessor.optimizePatternFlow(presentationMapping.patternMappings);
      this.processedContent.presentationMapping.patternMappings = optimizedMappings;

      // Generate pattern selection report
      const report = this.patternSelectionProcessor.generatePatternReport(presentationMapping);
      
      // Add warnings from pattern selection
      report.warnings.forEach(warning => {
        this.addWarning(ProcessingStage.PATTERN_SELECTION, 'PATTERN_WARNING', warning);
      });

      // Check for low confidence mappings
      const lowConfidenceMappings = presentationMapping.patternMappings.filter(mapping => mapping.confidence < 0.6);
      if (lowConfidenceMappings.length > 0) {
        this.addWarning(ProcessingStage.PATTERN_SELECTION, 'LOW_CONFIDENCE_PATTERNS', 
          `${lowConfidenceMappings.length} pattern mappings have low confidence scores`);
      }

    } catch (error) {
      this.addError(ProcessingStage.PATTERN_SELECTION, ErrorCode.PATTERN_SELECTION_FAILED, 
        `Pattern selection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private async processMarpGeneration(file: MarkdownFile): Promise<void> {
    try {
      this.currentStage = ProcessingStage.MARP_GENERATION;
      
      if (!this.processedContent?.presentationMapping) {
        throw new Error('Presentation mapping not available for Marp generation');
      }

      const slideStructure = await this.marpGenerator.generateMarpSlides(
        file, 
        this.processedContent.presentationMapping.patternMappings
      );
      
      this.processedContent.slideStructure = slideStructure;
      this.processedContent.metadata.processingStage = ProcessingStage.MARP_GENERATION;

      // Validate slide structure
      if (!slideStructure.slides || slideStructure.slides.length === 0) {
        this.addError(ProcessingStage.MARP_GENERATION, ErrorCode.MARP_GENERATION_FAILED, 'No slides generated');
        throw new Error('No slides were generated');
      }

      // Check for potential issues
      const longSlides = slideStructure.slides.filter(slide => 
        slide.contentSections.some(section => section.content.length > 800)
      );
      
      if (longSlides.length > 0) {
        this.addWarning(ProcessingStage.MARP_GENERATION, 'LONG_SLIDES', 
          `${longSlides.length} slides may be too long and could benefit from splitting`);
      }

      // Check for missing overview statements
      const slidesWithoutOverview = slideStructure.slides.filter(slide => 
        !slide.overviewStatement || slide.overviewStatement.length < 10
      );
      
      if (slidesWithoutOverview.length > 0) {
        this.addWarning(ProcessingStage.MARP_GENERATION, 'MISSING_OVERVIEW', 
          `${slidesWithoutOverview.length} slides are missing proper overview statements`);
      }

    } catch (error) {
      this.addError(ProcessingStage.MARP_GENERATION, ErrorCode.MARP_GENERATION_FAILED, 
        `Marp generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private async processHTMLConversion(file: MarkdownFile): Promise<HTMLSlideshow> {
    try {
      this.currentStage = ProcessingStage.HTML_CONVERSION;
      
      if (!this.processedContent?.slideStructure) {
        throw new Error('Slide structure not available for HTML conversion');
      }

      const htmlSlideshow = await this.htmlConverter.convertToHTML(this.processedContent.slideStructure);
      
      this.processedContent.htmlOutput = htmlSlideshow;
      this.processedContent.metadata.processingStage = ProcessingStage.HTML_CONVERSION;

      // Validate HTML output
      if (!htmlSlideshow.slides || htmlSlideshow.slides.length === 0) {
        this.addError(ProcessingStage.HTML_CONVERSION, ErrorCode.HTML_CONVERSION_FAILED, 'No HTML slides generated');
        throw new Error('No HTML slides were generated');
      }

      // Check accessibility features
      const slidesWithoutA11y = htmlSlideshow.slides.filter(slide => 
        !slide.accessibility.keyboardNavigation || !slide.accessibility.screenReaderSupport
      );
      
      if (slidesWithoutA11y.length > 0) {
        this.addWarning(ProcessingStage.HTML_CONVERSION, 'ACCESSIBILITY_ISSUES', 
          `${slidesWithoutA11y.length} slides may have accessibility issues`);
      }

      // Check for performance considerations
      const largeSlides = htmlSlideshow.slides.filter(slide => 
        slide.content.html.length > 5000
      );
      
      if (largeSlides.length > 0) {
        this.addWarning(ProcessingStage.HTML_CONVERSION, 'PERFORMANCE_WARNING', 
          `${largeSlides.length} slides have large HTML content that may impact performance`);
      }

      return htmlSlideshow;

    } catch (error) {
      this.addError(ProcessingStage.HTML_CONVERSION, ErrorCode.HTML_CONVERSION_FAILED, 
        `HTML conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  validateInput(files: MarkdownFile[]): ValidationResult {
    const errors: any[] = [];
    const warnings: any[] = [];

    // Check file count
    if (files.length !== 5) {
      errors.push({
        code: ErrorCode.INVALID_FILE_ORDER,
        message: `Expected 5 files, found ${files.length}`,
        severity: 'error'
      });
    }

    // Check file order
    const expectedOrder = [1, 2, 3, 4, 5];
    files.forEach((file, index) => {
      if (file.stage !== expectedOrder[index]) {
        errors.push({
          code: ErrorCode.INVALID_FILE_ORDER,
          message: `File ${file.path} has incorrect stage ${file.stage}, expected ${expectedOrder[index]}`,
          severity: 'error'
        });
      }
    });

    // Check file content
    files.forEach(file => {
      if (!file.content || file.content.trim().length === 0) {
        errors.push({
          code: ErrorCode.CORRUPTED_CONTENT,
          message: `File ${file.path} is empty or has no content`,
          severity: 'error'
        });
      }

      if (file.content && file.content.length < 100) {
        warnings.push({
          code: 'SHORT_CONTENT',
          message: `File ${file.path} has very short content (${file.content.length} characters)`,
          severity: 'warning'
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  getProcessingStatus(): ProcessingStatus {
    return {
      currentStage: this.currentStage,
      progress: this.progress,
      estimatedTimeRemaining: this.calculateEstimatedTime(),
      errors: this.errors,
      warnings: this.warnings
    };
  }

  private updateProgress(stage: ProcessingStage, progress: number): void {
    this.currentStage = stage;
    this.progress = progress;
  }

  private addError(stage: ProcessingStage, code: ErrorCode, message: string, context?: any): void {
    this.errors.push({
      stage,
      code,
      message,
      context,
      recoverable: false
    });
  }

  private addWarning(stage: ProcessingStage, code: string, message: string, context?: any): void {
    this.warnings.push({
      stage,
      code,
      message,
      context
    });
  }

  private calculateEstimatedTime(): number {
    const totalStages = 5;
    const currentStageIndex = this.getCurrentStageIndex();
    const averageTimePerStage = 30; // seconds
    
    const remainingStages = totalStages - currentStageIndex - 1;
    const progressInCurrentStage = this.progress % 20; // Each stage is roughly 20% progress
    const timeForCurrentStage = (20 - progressInCurrentStage) / 20 * averageTimePerStage;
    
    return Math.round(timeForCurrentStage + (remainingStages * averageTimePerStage));
  }

  private getCurrentStageIndex(): number {
    switch (this.currentStage) {
      case ProcessingStage.IDEA_ANALYSIS: return 0;
      case ProcessingStage.DRAFT_STRUCTURE: return 1;
      case ProcessingStage.PATTERN_SELECTION: return 2;
      case ProcessingStage.MARP_GENERATION: return 3;
      case ProcessingStage.HTML_CONVERSION: return 4;
      default: return 0;
    }
  }

  private reset(): void {
    this.currentStage = ProcessingStage.IDEA_ANALYSIS;
    this.progress = 0;
    this.errors = [];
    this.warnings = [];
    this.processedContent = null;
  }

  // Generate processing report
  generateProcessingReport(): ProcessingReport {
    if (!this.processedContent) {
      throw new Error('No processed content available for report generation');
    }

    const totalSlides = this.processedContent.slideStructure?.slides.length || 0;
    const totalTime = this.processedContent.htmlOutput?.metadata.estimatedDuration || 0;
    const principlesCount = this.processedContent.ideaFramework?.principles.length || 0;
    const patternsCount = this.processedContent.presentationMapping?.selectedPatterns.length || 0;

    return {
      summary: {
        totalSlides,
        totalTime,
        principlesApplied: principlesCount,
        patternsUsed: patternsCount,
        processingTime: this.calculateProcessingTime(),
        qualityScore: this.calculateQualityScore()
      },
      stages: {
        ideaAnalysis: this.processedContent.ideaFramework ? 'completed' : 'failed',
        draftStructure: this.processedContent.draftStructure ? 'completed' : 'failed',
        patternSelection: this.processedContent.presentationMapping ? 'completed' : 'failed',
        marpGeneration: this.processedContent.slideStructure ? 'completed' : 'failed',
        htmlConversion: this.processedContent.htmlOutput ? 'completed' : 'failed'
      },
      issues: {
        errors: this.errors,
        warnings: this.warnings
      },
      recommendations: this.generateRecommendations()
    };
  }

  private calculateProcessingTime(): number {
    // This would be calculated based on actual processing start/end times
    return Math.round(Date.now() / 1000); // Placeholder
  }

  private calculateQualityScore(): number {
    let score = 100;
    
    // Deduct points for errors and warnings
    score -= this.errors.length * 10;
    score -= this.warnings.length * 5;
    
    // Bonus points for comprehensive processing
    if (this.processedContent?.ideaFramework?.principles.length && this.processedContent.ideaFramework.principles.length > 3) {
      score += 5;
    }
    
    if (this.processedContent?.presentationMapping?.selectedPatterns.length && this.processedContent.presentationMapping.selectedPatterns.length > 5) {
      score += 5;
    }
    
    return Math.max(0, Math.min(100, score));
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.errors.length > 0) {
      recommendations.push('処理中にエラーが発生しました。入力ファイルの内容を確認してください。');
    }
    
    if (this.warnings.length > 3) {
      recommendations.push('多数の警告が発生しました。コンテンツの品質向上を検討してください。');
    }
    
    if (this.processedContent?.slideStructure?.slides.length && this.processedContent.slideStructure.slides.length > 20) {
      recommendations.push('スライド数が多すぎます。内容の簡潔化を検討してください。');
    }
    
    if (this.processedContent?.htmlOutput?.metadata.estimatedDuration && this.processedContent.htmlOutput.metadata.estimatedDuration > 30) {
      recommendations.push('プレゼンテーション時間が長すぎます。重要なポイントに絞り込むことを推奨します。');
    }
    
    return recommendations;
  }

  // Export processed content for analysis or debugging
  exportProcessedContent(): ProcessedContent | null {
    return this.processedContent;
  }

  // Generate Marp markdown file
  generateMarpMarkdown(): string {
    if (!this.processedContent?.slideStructure) {
      throw new Error('Slide structure not available for Marp generation');
    }
    
    return this.marpGenerator.generateMarpMarkdown(this.processedContent.slideStructure);
  }

  // Generate complete HTML file
  generateCompleteHTML(): string {
    if (!this.processedContent?.htmlOutput) {
      throw new Error('HTML output not available');
    }
    
    return this.htmlConverter.generateCompleteHTML(this.processedContent.htmlOutput);
  }
}

export interface ProcessingReport {
  summary: {
    totalSlides: number;
    totalTime: number;
    principlesApplied: number;
    patternsUsed: number;
    processingTime: number;
    qualityScore: number;
  };
  stages: {
    ideaAnalysis: 'completed' | 'failed' | 'skipped';
    draftStructure: 'completed' | 'failed' | 'skipped';
    patternSelection: 'completed' | 'failed' | 'skipped';
    marpGeneration: 'completed' | 'failed' | 'skipped';
    htmlConversion: 'completed' | 'failed' | 'skipped';
  };
  issues: {
    errors: ProcessingError[];
    warnings: ProcessingWarning[];
  };
  recommendations: string[];
}