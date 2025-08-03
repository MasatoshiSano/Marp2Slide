import { 
  SlideStructure, 
  HTMLSlideshow, 
  HTMLSlide, 
  HTMLContent, 
  NavigationComponent, 
  CSSStylesheet, 
  JavaScriptModule, 
  SlideshowMetadata, 
  AccessibilityFeatures, 
  ResponsiveLayout 
} from '../types/index.js';
import { defaultDesignSystem, generateCSSCustomProperties } from '../config/design-system.js';

export class HTMLConverter {
  private readonly ASPECT_RATIO = '16/9';
  private readonly MAX_WIDTH = 1920;
  private readonly MAX_HEIGHT = 1080;

  async convertToHTML(slideStructure: SlideStructure): Promise<HTMLSlideshow> {
    const slides = await this.convertSlides(slideStructure.slides);
    const navigation = this.createNavigationComponent(slideStructure);
    const styling = this.createCSSStylesheet();
    const scripts = this.createJavaScriptModules();
    const metadata = this.createSlideshowMetadata(slideStructure);

    return {
      slides,
      navigation,
      styling,
      scripts,
      metadata
    };
  }

  private async convertSlides(slideDefinitions: any[]): Promise<HTMLSlide[]> {
    const htmlSlides: HTMLSlide[] = [];

    for (let i = 0; i < slideDefinitions.length; i++) {
      const slideDef = slideDefinitions[i];
      const htmlSlide = await this.convertSlide(slideDef, i);
      htmlSlides.push(htmlSlide);
    }

    return htmlSlides;
  }

  private async convertSlide(slideDef: any, index: number): Promise<HTMLSlide> {
    const content = await this.generateSlideHTML(slideDef, index);
    const layout = this.createResponsiveLayout(slideDef.layout);
    const accessibility = this.createAccessibilityFeatures(slideDef, index);

    return {
      id: slideDef.id,
      title: slideDef.title,
      content,
      layout,
      accessibility
    };
  }

  private async generateSlideHTML(slideDef: any, index: number): Promise<HTMLContent> {
    const html = this.generateSlideHTMLStructure(slideDef, index);
    const css = this.generateSlideCSS(slideDef);
    const javascript = this.generateSlideJavaScript(slideDef);
    const assets = this.extractAssets(slideDef);

    return {
      html,
      css,
      javascript,
      assets
    };
  }

  private generateSlideHTMLStructure(slideDef: any, index: number): string {
    const slideClass = this.getSlideClass(slideDef);
    const layoutClass = this.getLayoutClass(slideDef.layout?.pattern);
    
    let html = `<section class="slide ${slideClass} ${layoutClass}" data-slide-index="${index}" id="${slideDef.id}">`;
    
    // Add navigation breadcrumb
    if (index > 0) {
      html += this.generateBreadcrumb(slideDef, index);
    }

    // Add main content
    html += '<div class="slide-content">';
    
    // Convert Markdown content to HTML
    slideDef.contentSections.forEach((section: any) => {
      html += this.convertMarkdownToHTML(section.content);
    });
    
    html += '</div>';

    // Add slide number
    html += `<div class="slide-number">${index + 1}</div>`;

    html += '</section>';

    return html;
  }

  private generateBreadcrumb(slideDef: any, index: number): string {
    return `<nav class="breadcrumb" aria-label="スライドナビゲーション">
      <span class="breadcrumb-item">スライド ${index + 1}</span>
      <span class="breadcrumb-separator">|</span>
      <span class="breadcrumb-title">${slideDef.title}</span>
    </nav>`;
  }

  private convertMarkdownToHTML(markdown: string): string {
    let html = markdown;

    // Remove Marp directives
    html = html.replace(/<!--\s*_[^>]*-->/g, '');
    
    // Convert headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Convert bold text (overview statements)
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="overview-statement">$1</strong>');

    // Convert italic text
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Convert lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');

    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Convert images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');

    // Convert code blocks
    html = html.replace(/```([^`]+)```/gs, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert horizontal rules
    html = html.replace(/^---$/gm, '<hr>');

    // Convert blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

    // Wrap paragraphs
    html = html.split('\n\n').map(paragraph => {
      paragraph = paragraph.trim();
      if (!paragraph) return '';
      if (paragraph.startsWith('<')) return paragraph;
      return `<p>${paragraph}</p>`;
    }).join('\n');

    // Apply pattern-specific formatting
    html = this.applyPatternSpecificFormatting(html);

    return html;
  }

  private applyPatternSpecificFormatting(html: string): string {
    // Number emphasis
    html = html.replace(/(\d+[%％億万千円ドル]*)/g, 
      '<span class="number-emphasis">$1</span>'
    );

    // Timeline items
    if (html.includes('timeline')) {
      html = html.replace(/<li>([^<]*(\d{4}|\d+年|\d+月)[^<]*)<\/li>/g, 
        '<li class="timeline-item">$1</li>'
      );
    }

    // Step items
    html = html.replace(/<li>(\d+\.\s*[^<]+)<\/li>/g, 
      '<li class="step-item">$1</li>'
    );

    // Metric cards for dashboard
    html = html.replace(/<li>([^:]+:\s*[^<]+)<\/li>/g, 
      '<li class="metric-item">$1</li>'
    );

    return html;
  }

  private generateSlideCSS(slideDef: any): string {
    let css = '';

    // Layout-specific CSS
    const layoutPattern = slideDef.layout?.pattern;
    if (layoutPattern === 'split') {
      css += `
        .slide-content {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }
        .slide-content > * {
          flex: 1;
        }
      `;
    } else if (layoutPattern === 'grid') {
      css += `
        .slide-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
      `;
    } else if (layoutPattern === 'center') {
      css += `
        .slide-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
      `;
    }

    // Content-specific adjustments
    const contentAnalysis = this.analyzeSlideContent(slideDef);
    if (contentAnalysis.isContentHeavy) {
      css += `
        .slide-content {
          font-size: 0.9rem;
          line-height: 1.4;
          padding: 1rem;
        }
      `;
    }

    return css;
  }

  private generateSlideJavaScript(slideDef: any): string {
    let js = '';

    // Add animation triggers
    if (slideDef.animations && slideDef.animations.length > 0) {
      js += `
        // Slide animations
        const slide = document.getElementById('${slideDef.id}');
        if (slide) {
          slide.addEventListener('slideenter', () => {
            slide.classList.add('slide-active');
          });
        }
      `;
    }

    // Add interactive elements
    if (slideDef.contentSections.some((section: any) => section.content.includes('click'))) {
      js += `
        // Interactive elements
        document.querySelectorAll('#${slideDef.id} .interactive').forEach(element => {
          element.addEventListener('click', handleInteraction);
        });
      `;
    }

    return js;
  }

  private extractAssets(slideDef: any): any[] {
    const assets: any[] = [];
    
    slideDef.contentSections.forEach((section: any) => {
      const imageMatches = section.content.match(/!\[([^\]]*)\]\(([^)]+)\)/g);
      if (imageMatches) {
        imageMatches.forEach((match: string) => {
          const imageMatch = match.match(/!\[([^\]]*)\]\(([^)]+)\)/);
          if (imageMatch) {
            assets.push({
              type: 'image',
              src: imageMatch[2],
              alt: imageMatch[1],
              loading: 'lazy'
            });
          }
        });
      }
    });

    return assets;
  }

  private getSlideClass(slideDef: any): string {
    const classes = ['slide-default'];
    
    if (slideDef.contentSections?.length > 1) {
      classes.push('multi-section');
    }

    if (slideDef.order === 1) {
      classes.push('title-slide');
    }

    return classes.join(' ');
  }

  private getLayoutClass(layoutPattern?: string): string {
    const layoutClasses: Record<string, string> = {
      'standard': 'layout-standard',
      'split': 'layout-split',
      'center': 'layout-center',
      'grid': 'layout-grid',
      'timeline': 'layout-timeline',
      'dashboard': 'layout-dashboard'
    };

    return layoutClasses[layoutPattern || 'standard'] || 'layout-standard';
  }

  private analyzeSlideContent(slideDef: any): { isContentHeavy: boolean } {
    const totalContent = slideDef.contentSections
      .map((section: any) => section.content)
      .join(' ');
    
    const lineCount = totalContent.split('\n').length;
    const characterCount = totalContent.length;

    return {
      isContentHeavy: lineCount > 15 || characterCount > 800
    };
  }

  private createResponsiveLayout(layoutDef?: any): ResponsiveLayout {
    return {
      aspectRatio: this.ASPECT_RATIO,
      breakpoints: [
        {
          name: 'mobile',
          minWidth: 320,
          maxWidth: 768,
          styles: {
            colors: { primary: '#2c5aa0', secondary: '#f39800', background: '#ffffff', text: '#333333', accent: '#4ecdc4' },
            typography: { fontFamily: 'system-ui', fontSize: 'clamp(0.875rem, 2vw, 1rem)', fontWeight: '400', lineHeight: '1.4' },
            spacing: { padding: '1rem', margin: '0', gap: '0.5rem' },
            effects: { shadows: [], borders: [], borderRadius: '4px' }
          }
        },
        {
          name: 'tablet',
          minWidth: 769,
          maxWidth: 1024,
          styles: {
            colors: { primary: '#2c5aa0', secondary: '#f39800', background: '#ffffff', text: '#333333', accent: '#4ecdc4' },
            typography: { fontFamily: 'system-ui', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: '400', lineHeight: '1.5' },
            spacing: { padding: '2rem', margin: '0', gap: '1rem' },
            effects: { shadows: [], borders: [], borderRadius: '4px' }
          }
        },
        {
          name: 'desktop',
          minWidth: 1025,
          styles: {
            colors: { primary: '#2c5aa0', secondary: '#f39800', background: '#ffffff', text: '#333333', accent: '#4ecdc4' },
            typography: { fontFamily: 'system-ui', fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', fontWeight: '400', lineHeight: '1.6' },
            spacing: { padding: '3rem', margin: '0', gap: '1.5rem' },
            effects: { shadows: [], borders: [], borderRadius: '4px' }
          }
        }
      ],
      safeArea: {
        top: '5vh',
        right: '5vw',
        bottom: '5vh',
        left: '5vw'
      }
    };
  }

  private createAccessibilityFeatures(slideDef: any, index: number): AccessibilityFeatures {
    return {
      ariaLabels: {
        slide: `スライド ${index + 1}: ${slideDef.title}`,
        content: `${slideDef.title}の内容`,
        navigation: 'スライドナビゲーション'
      },
      altTexts: this.extractAltTexts(slideDef),
      keyboardNavigation: true,
      screenReaderSupport: true,
      colorContrastRatio: 4.5,
      focusManagement: {
        focusOrder: [`#${slideDef.id}`],
        focusTraps: [],
        skipLinks: [
          {
            text: 'メインコンテンツにスキップ',
            target: `#${slideDef.id} .slide-content`,
            position: 0
          }
        ]
      }
    };
  }

  private extractAltTexts(slideDef: any): Record<string, string> {
    const altTexts: Record<string, string> = {};
    
    slideDef.contentSections.forEach((section: any) => {
      const imageMatches = section.content.match(/!\[([^\]]*)\]\(([^)]+)\)/g);
      if (imageMatches) {
        imageMatches.forEach((match: string, index: number) => {
          const imageMatch = match.match(/!\[([^\]]*)\]\(([^)]+)\)/);
          if (imageMatch) {
            altTexts[`image-${index}`] = imageMatch[1] || `画像 ${index + 1}`;
          }
        });
      }
    });

    return altTexts;
  }

  private createNavigationComponent(slideStructure: SlideStructure): NavigationComponent {
    return {
      controls: [
        {
          id: 'nav-prev',
          type: 'button',
          html: '<button class="nav-button nav-prev" aria-label="前のスライド">‹</button>',
          css: `
            .nav-prev {
              position: fixed;
              left: 2rem;
              top: 50%;
              transform: translateY(-50%);
              background: var(--primary-color);
              color: white;
              border: none;
              border-radius: 50%;
              width: 3rem;
              height: 3rem;
              font-size: 1.5rem;
              cursor: pointer;
              z-index: 1000;
              transition: all 0.3s ease;
            }
            .nav-prev:hover {
              background: var(--primary-dark);
              transform: translateY(-50%) scale(1.1);
            }
          `,
          javascript: `
            document.querySelector('.nav-prev').addEventListener('click', () => {
              slideshow.previousSlide();
            });
          `,
          accessibility: {
            ariaLabels: { button: '前のスライドに移動' },
            altTexts: {},
            keyboardNavigation: true,
            screenReaderSupport: true,
            colorContrastRatio: 4.5,
            focusManagement: {
              focusOrder: ['nav-prev'],
              focusTraps: [],
              skipLinks: []
            }
          }
        },
        {
          id: 'nav-next',
          type: 'button',
          html: '<button class="nav-button nav-next" aria-label="次のスライド">›</button>',
          css: `
            .nav-next {
              position: fixed;
              right: 2rem;
              top: 50%;
              transform: translateY(-50%);
              background: var(--primary-color);
              color: white;
              border: none;
              border-radius: 50%;
              width: 3rem;
              height: 3rem;
              font-size: 1.5rem;
              cursor: pointer;
              z-index: 1000;
              transition: all 0.3s ease;
            }
            .nav-next:hover {
              background: var(--primary-dark);
              transform: translateY(-50%) scale(1.1);
            }
          `,
          javascript: `
            document.querySelector('.nav-next').addEventListener('click', () => {
              slideshow.nextSlide();
            });
          `,
          accessibility: {
            ariaLabels: { button: '次のスライドに移動' },
            altTexts: {},
            keyboardNavigation: true,
            screenReaderSupport: true,
            colorContrastRatio: 4.5,
            focusManagement: {
              focusOrder: ['nav-next'],
              focusTraps: [],
              skipLinks: []
            }
          }
        }
      ],
      progressBar: {
        style: 'linear',
        position: 'bottom',
        showPercentage: false,
        animated: true
      },
      slideIndicator: {
        style: 'dots',
        position: 'bottom',
        interactive: true,
        showTitles: false
      }
    };
  }

  private createCSSStylesheet(): CSSStylesheet {
    const variables = generateCSSCustomProperties(defaultDesignSystem);
    
    const criticalCSS = `
      ${variables}
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html, body {
        height: 100%;
        font-family: var(--font-family-body);
        line-height: 1.6;
        color: var(--text-primary);
        background: var(--background);
      }
      
      .slideshow-container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
      }
      
      .slide {
        width: 100%;
        height: 100%;
        max-width: ${this.MAX_WIDTH}px;
        max-height: ${this.MAX_HEIGHT}px;
        aspect-ratio: ${this.ASPECT_RATIO};
        margin: 0 auto;
        padding: 5vh 5vw;
        display: none;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        position: relative;
        overflow: hidden;
      }
      
      .slide.active {
        display: flex;
      }
      
      .slide-content {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      
      h1, h2, h3, h4, h5, h6 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        line-height: 1.2;
      }
      
      h1 { font-size: var(--font-size-xl); }
      h2 { font-size: var(--font-size-lg); }
      h3 { font-size: var(--font-size-base); }
      
      .overview-statement {
        display: block;
        font-size: var(--font-size-lg);
        color: var(--primary-color);
        margin: 1.5rem 0;
        padding: 1rem;
        background: var(--background-alt);
        border-left: 4px solid var(--primary-color);
        border-radius: 4px;
      }
      
      ul, ol {
        margin: 1rem 0;
        padding-left: 2rem;
      }
      
      li {
        margin: 0.5rem 0;
      }
      
      .number-emphasis {
        font-size: 2rem;
        font-weight: bold;
        color: var(--secondary-color);
      }
      
      .timeline-item {
        position: relative;
        padding-left: 2rem;
        margin: 1rem 0;
      }
      
      .timeline-item::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.5rem;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background: var(--primary-color);
      }
      
      .step-item {
        background: var(--background-alt);
        padding: 1rem;
        margin: 0.5rem 0;
        border-radius: 4px;
        border-left: 4px solid var(--primary-color);
      }
      
      .metric-item {
        background: var(--background-alt);
        padding: 1.5rem;
        text-align: center;
        border-radius: 8px;
        border: 1px solid var(--border);
      }
      
      img {
        max-width: 100%;
        max-height: 60vh;
        object-fit: contain;
        display: block;
        margin: 1rem auto;
      }
      
      code {
        background: var(--background-alt);
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
        font-family: var(--font-family-mono);
      }
      
      pre {
        background: var(--background-alt);
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
        margin: 1rem 0;
      }
      
      .breadcrumb {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      
      .slide-number {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      
      .progress-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 4px;
        background: var(--primary-color);
        transition: width 0.3s ease;
        z-index: 1000;
      }
      
      .slide-indicators {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5rem;
        z-index: 1000;
      }
      
      .indicator-dot {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .indicator-dot.active {
        background: var(--primary-color);
        transform: scale(1.2);
      }
    `;

    const deferredCSS = `
      /* Animations */
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(-100%);
        }
      }
      
      .slide-enter {
        animation: slideIn 0.5s ease-in-out;
      }
      
      .slide-exit {
        animation: slideOut 0.5s ease-in-out;
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .slide {
          padding: 2rem 1rem;
        }
        
        h1 { font-size: 1.75rem; }
        h2 { font-size: 1.5rem; }
        h3 { font-size: 1.25rem; }
        
        .overview-statement {
          font-size: 1.125rem;
        }
        
        .nav-button {
          width: 2.5rem !important;
          height: 2.5rem !important;
          font-size: 1.25rem !important;
        }
      }
      
      /* Print styles */
      @media print {
        .slide {
          display: block !important;
          page-break-after: always;
          height: auto;
          max-height: none;
        }
        
        .nav-button,
        .progress-bar,
        .slide-indicators {
          display: none !important;
        }
      }
    `;

    return {
      critical: criticalCSS,
      deferred: deferredCSS,
      variables: {
        colors: {},
        fonts: {},
        spacing: {},
        breakpoints: {}
      },
      mediaQueries: [
        {
          condition: '(max-width: 768px)',
          styles: deferredCSS
        }
      ]
    };
  }

  private createJavaScriptModules(): JavaScriptModule[] {
    return [
      {
        name: 'slideshow',
        code: this.generateSlideshowScript(),
        dependencies: [],
        exports: ['Slideshow'],
        type: 'module'
      },
      {
        name: 'navigation',
        code: this.generateNavigationScript(),
        dependencies: ['slideshow'],
        exports: ['Navigation'],
        type: 'module'
      },
      {
        name: 'keyboard',
        code: this.generateKeyboardScript(),
        dependencies: ['slideshow'],
        exports: ['KeyboardHandler'],
        type: 'module'
      }
    ];
  }

  private generateSlideshowScript(): string {
    return `
      class Slideshow {
        constructor() {
          this.slides = document.querySelectorAll('.slide');
          this.currentSlide = 0;
          this.totalSlides = this.slides.length;
          this.init();
        }
        
        init() {
          if (this.slides.length > 0) {
            this.showSlide(0);
            this.updateProgress();
            this.createIndicators();
          }
        }
        
        showSlide(index) {
          this.slides.forEach(slide => slide.classList.remove('active'));
          
          if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.slides[index].classList.add('active');
            this.updateProgress();
            this.updateIndicators();
            
            // Announce slide change for screen readers
            this.announceSlideChange();
          }
        }
        
        nextSlide() {
          if (this.currentSlide < this.totalSlides - 1) {
            this.showSlide(this.currentSlide + 1);
          }
        }
        
        previousSlide() {
          if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
          }
        }
        
        goToSlide(index) {
          this.showSlide(index);
        }
        
        updateProgress() {
          const progressBar = document.querySelector('.progress-bar');
          if (progressBar) {
            const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
            progressBar.style.width = progress + '%';
          }
        }
        
        createIndicators() {
          const container = document.querySelector('.slide-indicators');
          if (!container) return;
          
          container.innerHTML = '';
          
          for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'indicator-dot';
            dot.setAttribute('aria-label', \`スライド \${i + 1}に移動\`);
            dot.addEventListener('click', () => this.goToSlide(i));
            container.appendChild(dot);
          }
          
          this.updateIndicators();
        }
        
        updateIndicators() {
          const dots = document.querySelectorAll('.indicator-dot');
          dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
          });
        }
        
        announceSlideChange() {
          const slide = this.slides[this.currentSlide];
          const title = slide.querySelector('h1, h2')?.textContent || \`スライド \${this.currentSlide + 1}\`;
          
          // Create announcement for screen readers
          const announcement = document.createElement('div');
          announcement.setAttribute('aria-live', 'polite');
          announcement.setAttribute('aria-atomic', 'true');
          announcement.className = 'sr-only';
          announcement.textContent = \`\${title} を表示中\`;
          
          document.body.appendChild(announcement);
          setTimeout(() => document.body.removeChild(announcement), 1000);
        }
      }
      
      // Initialize slideshow
      document.addEventListener('DOMContentLoaded', () => {
        window.slideshow = new Slideshow();
      });
    `;
  }

  private generateNavigationScript(): string {
    return `
      class Navigation {
        constructor(slideshow) {
          this.slideshow = slideshow;
          this.init();
        }
        
        init() {
          this.bindEvents();
        }
        
        bindEvents() {
          // Click navigation
          document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-next')) {
              this.slideshow.nextSlide();
            } else if (e.target.classList.contains('nav-prev')) {
              this.slideshow.previousSlide();
            }
          });
          
          // Touch/swipe navigation
          let startX = 0;
          let startY = 0;
          
          document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
          });
          
          document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if horizontal swipe is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
              if (deltaX > 0) {
                this.slideshow.previousSlide();
              } else {
                this.slideshow.nextSlide();
              }
              e.preventDefault();
            }
          });
        }
      }
      
      // Initialize navigation when slideshow is ready
      document.addEventListener('DOMContentLoaded', () => {
        if (window.slideshow) {
          new Navigation(window.slideshow);
        }
      });
    `;
  }

  private generateKeyboardScript(): string {
    return `
      class KeyboardHandler {
        constructor(slideshow) {
          this.slideshow = slideshow;
          this.init();
        }
        
        init() {
          document.addEventListener('keydown', (e) => {
            switch (e.key) {
              case 'ArrowRight':
              case ' ':
                this.slideshow.nextSlide();
                e.preventDefault();
                break;
                
              case 'ArrowLeft':
                this.slideshow.previousSlide();
                e.preventDefault();
                break;
                
              case 'Home':
                this.slideshow.goToSlide(0);
                e.preventDefault();
                break;
                
              case 'End':
                this.slideshow.goToSlide(this.slideshow.totalSlides - 1);
                e.preventDefault();
                break;
                
              case 'Escape':
                // Exit fullscreen if active
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                }
                break;
                
              case 'f':
              case 'F':
                // Toggle fullscreen
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
                break;
            }
          });
        }
      }
      
      // Initialize keyboard handler when slideshow is ready
      document.addEventListener('DOMContentLoaded', () => {
        if (window.slideshow) {
          new KeyboardHandler(window.slideshow);
        }
      });
    `;
  }

  private createSlideshowMetadata(slideStructure: SlideStructure): SlideshowMetadata {
    const now = new Date();
    
    return {
      title: 'Generated Slideshow',
      description: 'Interactive HTML slideshow generated from Markdown content',
      author: 'Marp2Slide System',
      created: now,
      modified: now,
      version: '1.0.0',
      slideCount: slideStructure.slides.length,
      estimatedDuration: slideStructure.slides.reduce((total, slide) => {
        return total + slide.contentSections.reduce((sectionTotal, section) => {
          return sectionTotal + (section.estimatedTime || 3);
        }, 0);
      }, 0),
      tags: ['presentation', 'slideshow', 'html', 'interactive'],
      language: 'ja'
    };
  }

  // Generate complete HTML document
  generateCompleteHTML(htmlSlideshow: HTMLSlideshow): string {
    const { slides, navigation, styling, scripts, metadata } = htmlSlideshow;
    
    let html = `<!DOCTYPE html>
<html lang="${metadata.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${metadata.description}">
  <meta name="author" content="${metadata.author}">
  <title>${metadata.title}</title>
  
  <style>
    ${styling.critical}
  </style>
</head>
<body>
  <div class="slideshow-container" role="main" aria-label="プレゼンテーション">
    ${slides.map(slide => slide.content.html).join('\n')}
    
    <!-- Navigation -->
    ${navigation.controls.map(control => control.html).join('\n')}
    
    <!-- Progress Bar -->
    <div class="progress-bar" role="progressbar" aria-label="プレゼンテーション進捗"></div>
    
    <!-- Slide Indicators -->
    <div class="slide-indicators" role="tablist" aria-label="スライド選択"></div>
  </div>
  
  <!-- Scripts -->
  ${scripts.map(script => `<script>${script.code}</script>`).join('\n')}
  
  <!-- Deferred Styles -->
  <style>
    ${styling.deferred}
  </style>
  
  <!-- Additional Navigation Styles -->
  <style>
    ${navigation.controls.map(control => control.css).join('\n')}
  </style>
</body>
</html>`;

    return html;
  }
}