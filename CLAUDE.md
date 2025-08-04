# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Instructions for Claude

### Slide Generation Request Handling
When the user requests slide creation using the format "〇〇についてスライドを作成して" or similar:

1. **Create a topic-specific folder** (e.g., "ai-technology" for "AI技術について")
2. **Generate 5 markdown files sequentially** in that folder:
   - 01_idea-approach-philosophy.md
   - 02_draft-creation-philosophy.md  
   - 03_how-to-present-complete-guide.md
   - 04_marp-expression-complete-guide.md
   - 05_marp-to-html-guide.md
3. **DO NOT ask for additional clarification** - proceed directly with generation
4. **Use the topic exactly as provided** by the user

**Example User Request Patterns:**
- "AIについてスライドを作成して"
- "TypeScript入門のスライドを作成して"  
- "マーケティング戦略についてスライドを作成して"

**Your Response Should Be:**
1. Create topic folder immediately
2. Generate all 5 markdown files with appropriate content for the topic
3. Confirm completion and show the created files
4. **Do not ask for requirements, design, or additional input**

### Generated Output Structure
Each slide generation creates a complete folder with:
- 01_idea-approach-philosophy.md (Stage 1: 理念・アプローチ)
- 02_draft-creation-philosophy.md (Stage 2: 構造・下書き)  
- 03_how-to-present-complete-guide.md (Stage 3: プレゼンテーション)
- 04_marp-expression-complete-guide.md (Stage 4: Marp記法)
- 05_marp-to-html-guide.md (Stage 5: HTML変換)