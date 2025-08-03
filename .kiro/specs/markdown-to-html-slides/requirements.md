# Requirements Document

## Introduction

このプロジェクトは、01から05の順番でMarkdownファイルを処理し、アイデアを美しいHTMLスライドに変換するシステムを構築することを目的としています。各ファイルには異なる段階の情報（アイデア方針、ドラフト作成、見せ方、Marp表現、HTML変換）が含まれており、これらを統合的に処理してプレゼンテーション品質のHTMLスライドを生成します。

## Requirements

### Requirement 1

**User Story:** As a content creator, I want to process markdown files sequentially (01-05) so that I can transform ideas into structured HTML slides following a systematic approach.

#### Acceptance Criteria

1. WHEN the system is invoked THEN it SHALL process files in the exact order: 01_idea-approach-philosophy.md, 02_draft-creation-philosophy.md, 03_how-to-present-complete-guide.md, 04_marp-expression-complete-guide.md, 05_marp-to-html-guide.md
2. WHEN processing each file THEN the system SHALL extract key concepts and methodologies from each stage
3. WHEN all files are processed THEN the system SHALL maintain the logical flow from idea conception to final HTML output

### Requirement 2

**User Story:** As a presenter, I want the system to apply the draft creation philosophy so that my content follows the proven 80-minute, 80% quality approach with proper structure.

#### Acceptance Criteria

1. WHEN processing the draft creation philosophy THEN the system SHALL implement the 4 essential elements: title, table of contents, what to discuss/not discuss, and summary
2. WHEN creating content structure THEN the system SHALL ensure each slide has a bold overview statement (概要文)
3. WHEN organizing information THEN the system SHALL follow the 3-5-1 information gathering rule for content validation

### Requirement 3

**User Story:** As a designer, I want the system to implement the 25 presentation patterns so that content is displayed using the most effective visual approach.

#### Acceptance Criteria

1. WHEN determining presentation format THEN the system SHALL select from the 25 identified patterns (numerical data, structural relationships, timeline flows, information organization, emotional/experiential)
2. WHEN content contains numerical data THEN the system SHALL apply appropriate patterns like number emphasis, comparisons, or charts
3. WHEN content shows relationships THEN the system SHALL use diagrams, matrices, or network visualizations
4. WHEN content follows a process THEN the system SHALL implement step-by-step, timeline, or flowchart layouts

### Requirement 4

**User Story:** As a developer, I want the system to generate Marp-compatible markdown so that slides can be converted to various formats while maintaining design consistency.

#### Acceptance Criteria

1. WHEN generating slides THEN the system SHALL follow the 5 golden rules: 1 slide 1 message, subtitle placement, layout variation, readability priority, and Marp constraint awareness
2. WHEN creating slide content THEN the system SHALL implement proper font sizing (22px base, responsive scaling)
3. WHEN designing layouts THEN the system SHALL use the 11 layout patterns (standard, split, center, background, grid, table, flowchart, accordion, timeline, card, dashboard)
4. WHEN content exceeds optimal length THEN the system SHALL automatically split into multiple slides or apply layout adjustments

### Requirement 5

**User Story:** As an end user, I want the final output to be high-quality HTML slides so that I can present effectively in web browsers with interactive features.

#### Acceptance Criteria

1. WHEN generating HTML output THEN the system SHALL maintain 16:9 aspect ratio with responsive design
2. WHEN creating HTML slides THEN the system SHALL implement navigation controls (previous/next buttons, keyboard shortcuts, progress bar)
3. WHEN styling content THEN the system SHALL use the unified design system with consistent colors, typography, and spacing
4. WHEN displaying content THEN the system SHALL ensure accessibility compliance (WCAG guidelines, screen reader support, keyboard navigation)
5. WHEN loading slides THEN the system SHALL optimize performance with lazy loading and efficient CSS

### Requirement 6

**User Story:** As a content manager, I want the system to handle various content types so that different kinds of information are appropriately formatted and displayed.

#### Acceptance Criteria

1. WHEN processing text content THEN the system SHALL apply appropriate typography hierarchy and formatting
2. WHEN handling images THEN the system SHALL implement responsive image loading with proper sizing and alt text
3. WHEN displaying code blocks THEN the system SHALL maintain syntax highlighting and proper formatting
4. WHEN showing data tables THEN the system SHALL create responsive, accessible table layouts

### Requirement 7

**User Story:** As a quality assurance tester, I want the system to validate output quality so that generated slides meet professional presentation standards.

#### Acceptance Criteria

1. WHEN slides are generated THEN the system SHALL validate that no content overflows the slide boundaries
2. WHEN checking readability THEN the system SHALL ensure minimum font sizes and sufficient color contrast
3. WHEN verifying structure THEN the system SHALL confirm all slides have proper titles and overview statements
4. WHEN testing functionality THEN the system SHALL validate that all interactive elements work correctly