// Core data models and interfaces for the markdown-to-html-slides system

export interface MarkdownFile {
  path: string;
  content: string;
  stage: number;
  metadata?: FileMetadata;
}

export interface FileMetadata {
  title?: string;
  author?: string;
  created?: Date;
  modified?: Date;
  stage: ProcessingStage;
  size: number;
}

export enum ProcessingStage {
  IDEA_ANALYSIS = 1,
  DRAFT_STRUCTURE = 2,
  PATTERN_SELECTION = 3,
  MARP_GENERATION = 4,
  HTML_CONVERSION = 5
}

export interface ProcessedContent {
  metadata: ContentMetadata;
  ideaFramework?: IdeaAnalysis;
  draftStructure?: DraftStructure;
  presentationMapping?: PresentationMapping;
  slideStructure?: SlideStructure;
  htmlOutput?: HTMLSlideshow;
}

export interface ContentMetadata {
  id: string;
  title: string;
  author?: string;
  created: Date;
  lastModified: Date;
  processingStage: ProcessingStage;
  version: string;
}

// Stage 1: Idea Analysis
export interface IdeaAnalysis {
  principles: Principle[];
  criticalThinking: CriticalThinkingFramework;
  evaluationCriteria: EvaluationCriteria;
}

export interface Principle {
  name: string;
  description: string;
  category: 'efficiency' | 'critical-thinking' | 'structured-approach';
  importance: number;
}

export interface CriticalThinkingFramework {
  technicalAspects: TechnicalAspect[];
  businessAspects: BusinessAspect[];
  userExperienceAspects: UXAspect[];
}

export interface TechnicalAspect {
  name: string;
  feasibility: number;
  scalability: number;
  maintainability: number;
  performance: number;
}

export interface BusinessAspect {
  name: string;
  valueProposition: string;
  differentiation: string;
  implementationCost: number;
  risk: number;
}

export interface UXAspect {
  name: string;
  usability: number;
  accessibility: number;
  reliability: number;
}

export interface EvaluationCriteria {
  technical: string[];
  business: string[];
  userExperience: string[];
}

// Stage 2: Draft Structure
export interface DraftStructure {
  essentialElements: EssentialElements;
  informationHierarchy: InformationHierarchy;
  overviewStatements: OverviewStatement[];
  timeConstraints: TimeConstraints;
}

export interface EssentialElements {
  title: string;
  tableOfContents: TOCItem[];
  discussionScope: DiscussionScope;
  summary: string;
}

export interface TOCItem {
  title: string;
  level: number;
  page?: number;
  children?: TOCItem[];
}

export interface DiscussionScope {
  included: string[];
  excluded: string[];
}

export interface OverviewStatement {
  slideId: string;
  statement: string;
  coreMessage: string;
  audienceBenefit: string;
}

export interface InformationHierarchy {
  sections: ContentSection[];
  relationships: SectionRelationship[];
}

export interface ContentSection {
  id: string;
  title: string;
  level: number;
  content: string;
  type: ContentType;
  estimatedTime: number;
}

export interface SectionRelationship {
  fromSection: string;
  toSection: string;
  relationshipType: 'prerequisite' | 'builds-on' | 'contrasts-with' | 'supports';
}

export interface TimeConstraints {
  totalTime: number; // 80 minutes
  phases: TimePhase[];
}

export interface TimePhase {
  name: string;
  duration: number;
  activities: string[];
}

// Stage 3: Presentation Pattern Selection
export interface PresentationMapping {
  contentTypes: ContentType[];
  selectedPatterns: PresentationPattern[];
  patternMappings: PatternMapping[];
}

export enum ContentType {
  NUMERICAL_DATA = 'numerical-data',
  STRUCTURAL_RELATIONSHIP = 'structural-relationship',
  TEMPORAL_FLOW = 'temporal-flow',
  INFORMATION_ORGANIZATION = 'information-organization',
  EMOTIONAL_EXPERIENTIAL = 'emotional-experiential'
}

export interface PresentationPattern {
  id: string;
  name: string;
  category: ContentType;
  description: string;
  useCases: string[];
  marpImplementation: string;
  effectiveness: number;
}

export interface PatternMapping {
  sectionId: string;
  selectedPattern: PresentationPattern;
  rationale: string;
  alternatives: PresentationPattern[];
  confidence: number;
}

// Stage 4: Slide Structure
export interface SlideStructure {
  slides: SlideDefinition[];
  navigation: NavigationStructure;
  interactions: InteractionDefinition[];
}

export interface SlideDefinition {
  id: string;
  order: number;
  title: string;
  overviewStatement: string;
  contentSections: ContentSection[];
  layout: LayoutDefinition;
  styling: StyleDefinition;
  animations?: AnimationDefinition[];
}

export interface LayoutDefinition {
  pattern: LayoutPattern;
  grid: GridDefinition;
  spacing: SpacingDefinition;
  responsive: ResponsiveDefinition;
}

export enum LayoutPattern {
  STANDARD = 'standard',
  SPLIT = 'split',
  CENTER = 'center',
  BACKGROUND = 'background',
  GRID = 'grid',
  TABLE = 'table',
  FLOWCHART = 'flowchart',
  ACCORDION = 'accordion',
  TIMELINE = 'timeline',
  CARD = 'card',
  DASHBOARD = 'dashboard'
}

export interface GridDefinition {
  columns: number;
  rows: number;
  gap: string;
  areas?: string[];
}

export interface SpacingDefinition {
  padding: string;
  margin: string;
  gap: string;
}

export interface ResponsiveDefinition {
  breakpoints: ResponsiveBreakpoint[];
  behavior: ResponsiveBehavior;
}

export interface ResponsiveBreakpoint {
  name: string;
  minWidth: number;
  maxWidth?: number;
  styles: Partial<StyleDefinition>;
}

export enum ResponsiveBehavior {
  SCALE = 'scale',
  REFLOW = 'reflow',
  HIDE = 'hide',
  STACK = 'stack'
}

export interface StyleDefinition {
  colors: ColorDefinition;
  typography: TypographyDefinition;
  spacing: SpacingDefinition;
  effects: EffectDefinition;
}

export interface ColorDefinition {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface TypographyDefinition {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
}

export interface EffectDefinition {
  shadows: string[];
  borders: string[];
  borderRadius: string;
  opacity?: number;
}

export interface AnimationDefinition {
  name: string;
  duration: number;
  easing: string;
  delay?: number;
  iterations?: number;
}

export interface NavigationStructure {
  type: 'linear' | 'hierarchical' | 'free-form';
  controls: NavigationControl[];
  shortcuts: KeyboardShortcut[];
}

export interface NavigationControl {
  type: 'button' | 'indicator' | 'progress';
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  style: StyleDefinition;
}

export interface KeyboardShortcut {
  key: string;
  modifiers?: string[];
  action: string;
  description: string;
}

export interface InteractionDefinition {
  type: 'click' | 'hover' | 'focus' | 'scroll';
  target: string;
  action: string;
  feedback: FeedbackDefinition;
}

export interface FeedbackDefinition {
  visual?: VisualFeedback;
  audio?: AudioFeedback;
  haptic?: HapticFeedback;
}

export interface VisualFeedback {
  animation: AnimationDefinition;
  colorChange?: ColorDefinition;
  sizeChange?: string;
}

export interface AudioFeedback {
  sound: string;
  volume: number;
}

export interface HapticFeedback {
  pattern: string;
  intensity: number;
}

// Stage 5: HTML Output
export interface HTMLSlideshow {
  slides: HTMLSlide[];
  navigation: NavigationComponent;
  styling: CSSStylesheet;
  scripts: JavaScriptModule[];
  metadata: SlideshowMetadata;
}

export interface HTMLSlide {
  id: string;
  title: string;
  content: HTMLContent;
  layout: ResponsiveLayout;
  accessibility: AccessibilityFeatures;
}

export interface HTMLContent {
  html: string;
  css: string;
  javascript?: string;
  assets: AssetReference[];
}

export interface AssetReference {
  type: 'image' | 'video' | 'audio' | 'font' | 'icon';
  src: string;
  alt?: string;
  title?: string;
  loading?: 'lazy' | 'eager';
}

export interface ResponsiveLayout {
  aspectRatio: string;
  breakpoints: ResponsiveBreakpoint[];
  safeArea: SafeAreaDefinition;
}

export interface SafeAreaDefinition {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface AccessibilityFeatures {
  ariaLabels: Record<string, string>;
  altTexts: Record<string, string>;
  keyboardNavigation: boolean;
  screenReaderSupport: boolean;
  colorContrastRatio: number;
  focusManagement: FocusManagement;
}

export interface FocusManagement {
  focusOrder: string[];
  focusTraps: string[];
  skipLinks: SkipLink[];
}

export interface SkipLink {
  text: string;
  target: string;
  position: number;
}

export interface NavigationComponent {
  controls: HTMLNavigationControl[];
  progressBar: ProgressBarDefinition;
  slideIndicator: SlideIndicatorDefinition;
}

export interface HTMLNavigationControl {
  id: string;
  type: 'button' | 'link' | 'menu';
  html: string;
  css: string;
  javascript: string;
  accessibility: AccessibilityFeatures;
}

export interface ProgressBarDefinition {
  style: 'linear' | 'circular' | 'stepped';
  position: 'top' | 'bottom' | 'left' | 'right';
  showPercentage: boolean;
  animated: boolean;
}

export interface SlideIndicatorDefinition {
  style: 'dots' | 'numbers' | 'thumbnails';
  position: 'top' | 'bottom' | 'left' | 'right';
  interactive: boolean;
  showTitles: boolean;
}

export interface CSSStylesheet {
  critical: string;
  deferred: string;
  variables: CSSVariables;
  mediaQueries: MediaQuery[];
}

export interface CSSVariables {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
}

export interface MediaQuery {
  condition: string;
  styles: string;
}

export interface JavaScriptModule {
  name: string;
  code: string;
  dependencies: string[];
  exports: string[];
  type: 'module' | 'script';
}

export interface SlideshowMetadata {
  title: string;
  description: string;
  author: string;
  created: Date;
  modified: Date;
  version: string;
  slideCount: number;
  estimatedDuration: number;
  tags: string[];
  language: string;
}

// Processing Pipeline Interfaces
export interface ProcessingPipeline {
  processFiles(files: MarkdownFile[]): Promise<HTMLSlideshow>;
  validateInput(files: MarkdownFile[]): ValidationResult;
  getProcessingStatus(): ProcessingStatus;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  code: string;
  message: string;
  file?: string;
  line?: number;
  column?: number;
  severity: 'error' | 'warning' | 'info';
}

export interface ValidationWarning {
  code: string;
  message: string;
  file?: string;
  line?: number;
  column?: number;
  suggestion?: string;
}

export interface ProcessingStatus {
  currentStage: ProcessingStage;
  progress: number;
  estimatedTimeRemaining: number;
  errors: ProcessingError[];
  warnings: ProcessingWarning[];
}

export interface ProcessingError {
  stage: ProcessingStage;
  code: string;
  message: string;
  context?: any;
  recoverable: boolean;
}

export interface ProcessingWarning {
  stage: ProcessingStage;
  code: string;
  message: string;
  context?: any;
}

// Error Handling
export enum ErrorCode {
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  INVALID_FILE_ORDER = 'INVALID_FILE_ORDER',
  CORRUPTED_CONTENT = 'CORRUPTED_CONTENT',
  ENCODING_ERROR = 'ENCODING_ERROR',
  INVALID_MARKDOWN = 'INVALID_MARKDOWN',
  MISSING_REQUIRED_ELEMENTS = 'MISSING_REQUIRED_ELEMENTS',
  CONTENT_TOO_LONG = 'CONTENT_TOO_LONG',
  PATTERN_SELECTION_FAILED = 'PATTERN_SELECTION_FAILED',
  MARP_GENERATION_FAILED = 'MARP_GENERATION_FAILED',
  HTML_CONVERSION_FAILED = 'HTML_CONVERSION_FAILED',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  ACCESSIBILITY_VIOLATION = 'ACCESSIBILITY_VIOLATION'
}

export interface ErrorContext {
  stage: ProcessingStage;
  file?: string;
  section?: string;
  additionalInfo?: Record<string, any>;
}

export interface RecoveryAction {
  type: 'retry' | 'fallback' | 'skip' | 'manual';
  description: string;
  parameters?: Record<string, any>;
}