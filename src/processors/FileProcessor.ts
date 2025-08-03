import { readFileSync } from 'fs';
import { join } from 'path';
import { 
  MarkdownFile, 
  FileMetadata, 
  ProcessingStage, 
  ValidationResult, 
  ValidationError, 
  ErrorCode 
} from '../types/index.js';

export class FileProcessor {
  private readonly requiredFiles = [
    '01_idea-approach-philosophy.md',
    '02_draft-creation-philosophy.md',
    '03_how-to-present-complete-guide.md',
    '04_marp-expression-complete-guide.md',
    '05_marp-to-html-guide.md'
  ];

  async processFiles(inputDirectory: string): Promise<MarkdownFile[]> {
    const validationResult = this.validateInputDirectory(inputDirectory);
    
    if (!validationResult.isValid) {
      throw new Error(`Input validation failed: ${validationResult.errors.map(e => e.message).join(', ')}`);
    }

    const files: MarkdownFile[] = [];
    
    for (let i = 0; i < this.requiredFiles.length; i++) {
      const fileName = this.requiredFiles[i];
      const filePath = join(inputDirectory, fileName);
      
      try {
        const content = readFileSync(filePath, 'utf-8');
        const metadata = this.extractMetadata(filePath, content, i + 1);
        
        files.push({
          path: filePath,
          content,
          stage: i + 1,
          metadata
        });
      } catch (error) {
        throw new Error(`Failed to read file ${fileName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return files;
  }

  validateInputDirectory(inputDirectory: string): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: any[] = [];

    try {
      for (let i = 0; i < this.requiredFiles.length; i++) {
        const fileName = this.requiredFiles[i];
        const filePath = join(inputDirectory, fileName);
        
        try {
          const content = readFileSync(filePath, 'utf-8');
          
          // Check file order (stage number should match array index + 1)
          const expectedStage = i + 1;
          if (!fileName.startsWith(`0${expectedStage}_`)) {
            errors.push({
              code: ErrorCode.INVALID_FILE_ORDER,
              message: `File ${fileName} is not in the correct order. Expected stage ${expectedStage}.`,
              file: fileName,
              severity: 'error'
            });
          }

          // Check if file is empty
          if (content.trim().length === 0) {
            errors.push({
              code: ErrorCode.CORRUPTED_CONTENT,
              message: `File ${fileName} is empty.`,
              file: fileName,
              severity: 'error'
            });
          }

          // Basic markdown validation
          if (!this.isValidMarkdown(content)) {
            errors.push({
              code: ErrorCode.INVALID_MARKDOWN,
              message: `File ${fileName} contains invalid markdown syntax.`,
              file: fileName,
              severity: 'error'
            });
          }

        } catch (fileError) {
          errors.push({
            code: ErrorCode.FILE_NOT_FOUND,
            message: `Required file ${fileName} not found in directory ${inputDirectory}.`,
            file: fileName,
            severity: 'error'
          });
        }
      }
    } catch (dirError) {
      errors.push({
        code: ErrorCode.FILE_NOT_FOUND,
        message: `Cannot access directory ${inputDirectory}.`,
        severity: 'error'
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private extractMetadata(filePath: string, content: string, stage: number): FileMetadata {
    const stats = this.getFileStats(filePath);
    const title = this.extractTitle(content);
    
    return {
      title,
      author: this.extractAuthor(content),
      created: stats?.created || new Date(),
      modified: stats?.modified || new Date(),
      stage: stage as ProcessingStage,
      size: content.length
    };
  }

  private extractTitle(content: string): string {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : 'Untitled';
  }

  private extractAuthor(content: string): string | undefined {
    const authorPatterns = [
      /author:\s*(.+)/i,
      /by:\s*(.+)/i,
      /作成者:\s*(.+)/i,
      /著者:\s*(.+)/i
    ];

    for (const pattern of authorPatterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return undefined;
  }

  private getFileStats(filePath: string): { created: Date; modified: Date } | null {
    try {
      const fs = require('fs');
      const stats = fs.statSync(filePath);
      return {
        created: stats.birthtime,
        modified: stats.mtime
      };
    } catch {
      return null;
    }
  }

  private isValidMarkdown(content: string): boolean {
    // Basic markdown validation checks
    const lines = content.split('\n');
    let hasValidStructure = false;

    for (const line of lines) {
      // Check for common markdown elements
      if (line.match(/^#{1,6}\s+.+/) || // Headers
          line.match(/^\*.+/) ||        // Unordered lists
          line.match(/^\d+\.\s+.+/) ||  // Ordered lists
          line.match(/^\>\s*.+/) ||     // Blockquotes
          line.match(/^```/) ||         // Code blocks
          line.trim().length > 0) {     // Non-empty content
        hasValidStructure = true;
      }

      // Check for invalid patterns that might indicate encoding issues
      if (line.includes('\uFFFD') || // Replacement character
          line.includes('\x00')) {    // Null character
        return false;
      }
    }

    return hasValidStructure;
  }

  async validateFileContent(file: MarkdownFile): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: any[] = [];

    // Stage-specific validation
    switch (file.stage) {
      case ProcessingStage.IDEA_ANALYSIS:
        this.validateIdeaAnalysisContent(file.content, errors);
        break;
      case ProcessingStage.DRAFT_STRUCTURE:
        this.validateDraftStructureContent(file.content, errors);
        break;
      case ProcessingStage.PATTERN_SELECTION:
        this.validatePatternSelectionContent(file.content, errors);
        break;
      case ProcessingStage.MARP_GENERATION:
        this.validateMarpGenerationContent(file.content, errors);
        break;
      case ProcessingStage.HTML_CONVERSION:
        this.validateHtmlConversionContent(file.content, errors);
        break;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private validateIdeaAnalysisContent(content: string, errors: ValidationError[]): void {
    const requiredSections = ['アイデア', '手法', '原則', '評価'];
    this.checkRequiredSections(content, requiredSections, errors, 'idea analysis');
  }

  private validateDraftStructureContent(content: string, errors: ValidationError[]): void {
    const requiredSections = ['タイトル', '目次', '論点', 'まとめ'];
    this.checkRequiredSections(content, requiredSections, errors, 'draft structure');
  }

  private validatePatternSelectionContent(content: string, errors: ValidationError[]): void {
    const requiredSections = ['パターン', '表現', '見せ方'];
    this.checkRequiredSections(content, requiredSections, errors, 'pattern selection');
  }

  private validateMarpGenerationContent(content: string, errors: ValidationError[]): void {
    const requiredSections = ['Marp', 'スライド', 'レイアウト'];
    this.checkRequiredSections(content, requiredSections, errors, 'Marp generation');
  }

  private validateHtmlConversionContent(content: string, errors: ValidationError[]): void {
    const requiredSections = ['HTML', '変換', 'インタラクティブ'];
    this.checkRequiredSections(content, requiredSections, errors, 'HTML conversion');
  }

  private checkRequiredSections(
    content: string, 
    requiredSections: string[], 
    errors: ValidationError[], 
    stageName: string
  ): void {
    const lowercaseContent = content.toLowerCase();
    
    for (const section of requiredSections) {
      if (!lowercaseContent.includes(section.toLowerCase())) {
        errors.push({
          code: ErrorCode.MISSING_REQUIRED_ELEMENTS,
          message: `Required section "${section}" not found in ${stageName} content.`,
          severity: 'warning'
        });
      }
    }
  }

  getProcessingOrder(): string[] {
    return [...this.requiredFiles];
  }

  getStageFromFileName(fileName: string): ProcessingStage | null {
    const stageMatch = fileName.match(/^0(\d)_/);
    if (stageMatch) {
      const stageNumber = parseInt(stageMatch[1], 10);
      if (stageNumber >= 1 && stageNumber <= 5) {
        return stageNumber as ProcessingStage;
      }
    }
    return null;
  }
}