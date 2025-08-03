# MarpからHTML作成のための完全ガイド

> **16:9スライドを美しいHTMLに変換するための設計原則と実装方法**

## 📖 このガイドについて

**用途**: Marpで作成したスライドを高品質なHTMLプレゼンテーションに変換するための技術ガイド

**対象出力**: 
- インタラクティブHTMLプレゼンテーション
- レスポンシブWebスライド
- アクセシブルなオンライン発表資料

**前提**: 
- Marpの基本的な使い方を理解している
- HTML/CSSの基礎知識がある

**関連ガイド**: 
- Marpの基本設計 → `marp-expression-complete-guide.md`
- コンテンツ最適化 → `content-driven-layout-guide.md`

## 🎯 HTML変換の基本原則

### **1. 16:9比率の厳守**
```css
/* 基本設定：1920x1080を基準とした相対設計 */
section {
  width: 100vw;
  height: 100vh;
  max-width: 1920px;
  max-height: 1080px;
  aspect-ratio: 16/9;
  margin: 0 auto;
  box-sizing: border-box;
}

/* レスポンシブ対応 */
@media (max-aspect-ratio: 16/9) {
  section {
    width: calc(100vh * 16/9);
    height: 100vh;
  }
}

@media (min-aspect-ratio: 16/9) {
  section {
    width: 100vw;
    height: calc(100vw * 9/16);
  }
}
```

### **2. 絶対にはみ出さない設計**
```css
/* コンテナの安全領域設定 */
.slide-container {
  padding: 5vh 5vw; /* 画面の5%を余白として確保 */
  min-height: 90vh;
  max-height: 90vh;
  overflow: hidden; /* はみ出し防止 */
}

/* テキストの自動調整 */
.auto-fit-text {
  font-size: clamp(1rem, 2.5vw, 2rem); /* 可変フォントサイズ */
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* 画像の安全表示 */
img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
```

### **3. 統一感のあるデザインシステム**
```css
/* カラーパレット定義 */
:root {
  /* プライマリカラー */
  --primary-color: #2c5aa0;
  --primary-light: #4a7bc8;
  --primary-dark: #1e3d6f;
  
  /* セカンダリカラー */
  --secondary-color: #f39800;
  --secondary-light: #ffb347;
  --secondary-dark: #cc7a00;
  
  /* ニュートラルカラー */
  --text-primary: #333333;
  --text-secondary: #666666;
  --text-muted: #999999;
  --background: #ffffff;
  --background-alt: #f8f9fa;
  --border: #e9ecef;
  
  /* フォントサイズスケール */
  --font-size-xs: clamp(0.75rem, 1.5vw, 1rem);
  --font-size-sm: clamp(1rem, 2vw, 1.25rem);
  --font-size-base: clamp(1.125rem, 2.5vw, 1.5rem);
  --font-size-lg: clamp(1.5rem, 3vw, 2rem);
  --font-size-xl: clamp(2rem, 4vw, 2.5rem);
  --font-size-xxl: clamp(2.5rem, 5vw, 3.5rem);
  
  /* スペーシングスケール */
  --spacing-xs: clamp(0.25rem, 1vw, 0.5rem);
  --spacing-sm: clamp(0.5rem, 1.5vw, 1rem);
  --spacing-md: clamp(1rem, 2.5vw, 1.5rem);
  --spacing-lg: clamp(1.5rem, 3vw, 2rem);
  --spacing-xl: clamp(2rem, 4vw, 3rem);
}

/* タイポグラフィ統一 */
h1 { 
  font-size: var(--font-size-xxl);
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
  font-weight: 700;
}

h2 { 
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: 600;
}

h3 { 
  font-size: var(--font-size-lg);
  color: var(--primary-dark);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
}

p, li {
  font-size: var(--font-size-base);
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}
```

## 📐 レイアウトパターンとHTML実装

> **詳細なレイアウトパターン**: より多くのバリエーションについては `marp-expression-complete-guide.md` の「🎨 レイアウトバリエーション完全版」を参照してください。ここでは主要パターンのHTML実装方法を解説します。

### **1. 標準レイアウト**
```html
<section class="slide standard-layout">
  <div class="slide-container">
    <header class="slide-header">
      <h2>スライドタイトル</h2>
      <p class="slide-subtitle">概要文をここに配置</p>
    </header>
    
    <main class="slide-content">
      <div class="content-section">
        <h3>セクション1</h3>
        <ul class="content-list">
          <li>内容1</li>
          <li>内容2</li>
        </ul>
      </div>
      
      <div class="content-section">
        <h3>セクション2</h3>
        <ul class="content-list">
          <li>内容1</li>
          <li>内容2</li>
        </ul>
      </div>
    </main>
  </div>
</section>

<style>
.standard-layout .slide-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.slide-header {
  text-align: center;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: var(--spacing-md);
}

.slide-subtitle {
  font-weight: 600;
  color: var(--text-secondary);
  font-style: italic;
}

.slide-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  flex: 1;
}

.content-section h3 {
  border-left: 4px solid var(--secondary-color);
  padding-left: var(--spacing-sm);
}

.content-list {
  list-style: none;
  padding: 0;
}

.content-list li {
  position: relative;
  padding-left: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
}

.content-list li::before {
  content: "▶";
  color: var(--secondary-color);
  position: absolute;
  left: 0;
}
</style>
```

### **2. 左右分割レイアウト**
```html
<section class="slide split-layout">
  <div class="slide-container">
    <header class="slide-header">
      <h2>比較・対比スライド</h2>
      <p class="slide-subtitle">2つの手法を並べて比較し、それぞれの特徴を明確にします</p>
    </header>
    
    <main class="split-content">
      <div class="split-left">
        <h3>手法A</h3>
        <div class="comparison-card">
          <ul>
            <li>特徴1</li>
            <li>特徴2</li>
            <li>特徴3</li>
          </ul>
        </div>
      </div>
      
      <div class="split-divider"></div>
      
      <div class="split-right">
        <h3>手法B</h3>
        <div class="comparison-card">
          <ul>
            <li>特徴1</li>
            <li>特徴2</li>
            <li>特徴3</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</section>

<style>
.split-layout .slide-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.split-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-lg);
  flex: 1;
  align-items: stretch;
}

.split-divider {
  width: 2px;
  background: linear-gradient(to bottom, transparent, var(--border), transparent);
  margin: var(--spacing-md) 0;
}

.comparison-card {
  background: var(--background-alt);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--spacing-lg);
  height: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.split-left h3 {
  color: var(--primary-color);
  text-align: center;
}

.split-right h3 {
  color: var(--secondary-color);
  text-align: center;
}
</style>
```

### **3. グリッドレイアウト**
```html
<section class="slide grid-layout">
  <div class="slide-container">
    <header class="slide-header">
      <h2>4つの要素</h2>
      <p class="slide-subtitle">重要な4つの要素をバランスよく配置して説明します</p>
    </header>
    
    <main class="grid-content">
      <div class="grid-item" data-color="primary">
        <div class="grid-icon">🚀</div>
        <h3>要素1</h3>
        <p>説明文がここに入ります</p>
      </div>
      
      <div class="grid-item" data-color="secondary">
        <div class="grid-icon">🔒</div>
        <h3>要素2</h3>
        <p>説明文がここに入ります</p>
      </div>
      
      <div class="grid-item" data-color="success">
        <div class="grid-icon">💡</div>
        <h3>要素3</h3>
        <p>説明文がここに入ります</p>
      </div>
      
      <div class="grid-item" data-color="warning">
        <div class="grid-icon">📊</div>
        <h3>要素4</h3>
        <p>説明文がここに入ります</p>
      </div>
    </main>
  </div>
</section>

<style>
.grid-layout .slide-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.grid-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  flex: 1;
}

.grid-item {
  background: white;
  border-radius: 12px;
  padding: var(--spacing-lg);
  text-align: center;
  border: 2px solid var(--border);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-sm);
}

.grid-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.grid-item[data-color="primary"] {
  border-color: var(--primary-color);
}

.grid-item[data-color="secondary"] {
  border-color: var(--secondary-color);
}

.grid-item[data-color="success"] {
  border-color: #4ecdc4;
}

.grid-item[data-color="warning"] {
  border-color: #ff6b6b;
}

.grid-icon {
  font-size: var(--font-size-xxl);
  margin-bottom: var(--spacing-sm);
}

.grid-item h3 {
  margin: 0;
  color: inherit;
}

.grid-item p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}
</style>
```

## 🎨 インタラクティブ要素の実装

### **1. ナビゲーション機能**
```html
<nav class="slide-navigation">
  <button class="nav-btn" id="prevBtn" aria-label="前のスライド">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  </button>
  
  <div class="slide-indicator">
    <span id="currentSlide">1</span>
    <span class="indicator-separator">/</span>
    <span id="totalSlides">10</span>
  </div>
  
  <button class="nav-btn" id="nextBtn" aria-label="次のスライド">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
    </svg>
  </button>
</nav>

<div class="progress-bar">
  <div class="progress-fill" id="progressFill"></div>
</div>

<style>
.slide-navigation {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  z-index: 100;
}

.nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.nav-btn:hover {
  background: var(--background-alt);
}

.nav-btn svg {
  fill: var(--text-primary);
}

.slide-indicator {
  font-family: monospace;
  font-size: 1rem;
  color: var(--text-primary);
  min-width: 60px;
  text-align: center;
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  z-index: 100;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transition: width 0.3s ease;
  width: 10%;
}
</style>

<script>
class SlideNavigation {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    
    this.initNavigation();
    this.updateDisplay();
  }
  
  initNavigation() {
    document.getElementById('prevBtn').addEventListener('click', () => this.previousSlide());
    document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());
    
    // キーボードナビゲーション
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.previousSlide();
          break;
        case 'Home':
          e.preventDefault();
          this.goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          this.goToSlide(this.totalSlides - 1);
          break;
      }
    });
  }
  
  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.goToSlide(this.currentSlide + 1);
    }
  }
  
  previousSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    }
  }
  
  goToSlide(index) {
    this.slides[this.currentSlide].classList.remove('active');
    this.currentSlide = index;
    this.slides[this.currentSlide].classList.add('active');
    this.updateDisplay();
  }
  
  updateDisplay() {
    document.getElementById('currentSlide').textContent = this.currentSlide + 1;
    document.getElementById('totalSlides').textContent = this.totalSlides;
    
    const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    // ナビゲーションボタンの状態更新
    document.getElementById('prevBtn').disabled = this.currentSlide === 0;
    document.getElementById('nextBtn').disabled = this.currentSlide === this.totalSlides - 1;
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new SlideNavigation();
});
</script>
```

### **2. フルスクリーン機能**
```html
<button class="fullscreen-btn" id="fullscreenBtn" aria-label="フルスクリーン切り替え">
  <svg class="fullscreen-icon" width="24" height="24" viewBox="0 0 24 24">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
  </svg>
</button>

<style>
.fullscreen-btn {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.2s;
  z-index: 100;
}

.fullscreen-btn:hover {
  background: white;
  transform: scale(1.1);
}

.fullscreen-icon {
  fill: var(--text-primary);
}
</style>

<script>
document.getElementById('fullscreenBtn').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('フルスクリーンエラー:', err);
    });
  } else {
    document.exitFullscreen();
  }
});
</script>
```

## 🔧 最適化とパフォーマンス

### **1. レスポンシブ画像の実装**
```html
<picture class="responsive-image">
  <source media="(min-width: 1200px)" srcset="image-large.webp">
  <source media="(min-width: 768px)" srcset="image-medium.webp">
  <source media="(min-width: 480px)" srcset="image-small.webp">
  <img src="image-fallback.jpg" alt="説明文" loading="lazy">
</picture>

<style>
.responsive-image {
  display: block;
  width: 100%;
  max-height: 60vh;
}

.responsive-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}
</style>
```

### **2. CSS最適化**
```css
/* Critical CSS - インライン化推奨 */
.slide {
  display: none;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.slide.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 遅延読み込みCSS */
.lazy-load {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.lazy-load.loaded {
  opacity: 1;
  transform: translateY(0);
}
```

### **3. アクセシビリティ対応**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>プレゼンテーションタイトル</title>
  
  <!-- アクセシビリティメタ情報 -->
  <meta name="description" content="プレゼンテーションの概要">
  <meta name="author" content="作成者名">
  
  <!-- 高コントラストモード対応 -->
  <meta name="color-scheme" content="light dark">
</head>

<body>
  <!-- スキップリンク -->
  <a href="#main-content" class="skip-link">メインコンテンツへスキップ</a>
  
  <!-- ライブリージョン -->
  <div aria-live="polite" aria-atomic="true" class="sr-only" id="slide-announcer"></div>
  
  <main id="main-content" role="main">
    <!-- スライドコンテンツ -->
  </main>
</body>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 高コントラストモード */
@media (prefers-contrast: high) {
  :root {
    --primary-color: #000000;
    --text-primary: #000000;
    --background: #ffffff;
    --border: #000000;
  }
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #5a9fd4;
    --text-primary: #ffffff;
    --background: #1a1a1a;
    --background-alt: #2d2d2d;
    --border: #404040;
  }
}

/* モーション削減 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
</html>
```

## 📱 出力設定とビルド

### **Marp設定ファイル**
```javascript
// marp.config.js
module.exports = {
  inputDir: './slides',
  output: './dist',
  html: {
    allow: ['local-files'],
    template: './templates/slide-template.html'
  },
  pdf: false,
  pptx: false,
  server: {
    port: 8080
  },
  watch: true,
  theme: 'custom',
  themeSet: './themes'
};
```

### **ビルドコマンド**
```bash
# 基本的なHTML生成
marp slides.md --html --allow-local-files --output index.html

# テンプレート使用
marp slides.md --html --template template.html --output presentation.html

# 最適化付きビルド
marp slides.md --html --theme custom.css --allow-local-files --output dist/index.html

# ウォッチモード
marp slides.md --html --watch --server --port 8080
```

---

**この考え方に従えば、美しく、アクセシブルで、パフォーマンスに優れたHTMLプレゼンテーションを作成できます！** 🚀