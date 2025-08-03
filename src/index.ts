export { ProcessingPipeline } from './ProcessingPipeline.js';
export type { ProcessingReport } from './ProcessingPipeline.js';

// Processors
export { FileProcessor } from './processors/FileProcessor.js';
export { ContentParser } from './processors/ContentParser.js';
export type { ParsedContent } from './processors/ContentParser.js';
export { IdeaAnalysisProcessor } from './processors/IdeaAnalysisProcessor.js';
export type { IdeaEvaluationResult } from './processors/IdeaAnalysisProcessor.js';
export { DraftStructureProcessor } from './processors/DraftStructureProcessor.js';
export type { DraftValidationResult } from './processors/DraftStructureProcessor.js';
export { PatternSelectionProcessor } from './processors/PatternSelectionProcessor.js';
export type { PatternSelectionReport } from './processors/PatternSelectionProcessor.js';
export { MarpGenerator } from './processors/MarpGenerator.js';
export { HTMLConverter } from './processors/HTMLConverter.js';

// Configuration
export { defaultDesignSystem, defaultLayoutConfiguration, generateCSSCustomProperties } from './config/design-system.js';
export { 
  presentationPatterns, 
  patternSelectionWeights, 
  contentAnalysisKeywords,
  getPatternById,
  getPatternsByCategory,
  getCompatiblePatterns,
  getFallbackPatterns
} from './config/presentation-patterns.js';

// Types
export * from './types/index.js';

// Quick start function for easy usage
export async function processMarkdownToHTML(inputDirectory: string): Promise<string> {
  const pipeline = new ProcessingPipeline();
  const htmlSlideshow = await pipeline.processFiles(inputDirectory);
  return pipeline.generateCompleteHTML();
}

// Generate only Marp markdown
export async function processMarkdownToMarp(inputDirectory: string): Promise<string> {
  const pipeline = new ProcessingPipeline();
  await pipeline.processFiles(inputDirectory);
  return pipeline.generateMarpMarkdown();
}

// Get processing status during operation
export async function getProcessingStatus(pipeline: ProcessingPipeline) {
  return pipeline.getProcessingStatus();
}

// Generate processing report
export async function generateReport(inputDirectory: string): Promise<ProcessingReport> {
  const pipeline = new ProcessingPipeline();
  await pipeline.processFiles(inputDirectory);
  return pipeline.generateProcessingReport();
}