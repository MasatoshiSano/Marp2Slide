# 製造業における生成AI活用 - HTML変換ガイド

## 1. 基本的なHTML変換設定

### Marpコマンドライン基本形
```bash
# 基本的なHTML変換
marp manufacturing-genai-slides.md --html --output manufacturing-genai-presentation.html

# テーマとCSSを含む変換
marp manufacturing-genai-slides.md --html --theme-set custom-theme.css --output presentation.html

# プレゼンテーションモード対応
marp manufacturing-genai-slides.md --html --template bespoke --output interactive-presentation.html
```

### 高度な変換オプション
```bash
# 全機能を含む変換
marp manufacturing-genai-slides.md \
  --html \
  --allow-local-files \
  --template bespoke \
  --bespoke.progress \
  --bespoke.osc \
  --output manufacturing-ai-complete.html
```

## 2. カスタムHTMLテンプレート

### 製造業向けHTMLテンプレート
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>製造業における生成AI活用 - 最新動向と成功事例</title>
    
    <!-- Marp CSS -->
    <link rel="stylesheet" href="marp-core.css">
    
    <!-- カスタムスタイル -->
    <style>
        :root {
            --manufacturing-primary: #1e40af;
            --manufacturing-secondary: #3b82f6;
            --manufacturing-accent: #fbbf24;
            --manufacturing-success: #10b981;
            --manufacturing-warning: #f59e0b;
            --manufacturing-error: #ef4444;
        }
        
        /* プレゼンテーション拡張 */
        .presentation-controls {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            gap: 10px;
        }
        
        .control-btn {
            background: var(--manufacturing-primary);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .control-btn:hover {
            background: var(--manufacturing-secondary);
        }
        
        /* 進行状況バー */
        .progress-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(0,0,0,0.1);
            z-index: 1000;
        }
        
        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--manufacturing-primary), var(--manufacturing-accent));
            width: 0%;
            transition: width 0.3s ease;
        }
        
        /* スライド遷移効果 */
        .slide-transition {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* 印刷対応 */
        @media print {
            .presentation-controls,
            .progress-container {
                display: none !important;
            }
            
            section {
                page-break-after: always;
                break-after: page;
            }
        }
    </style>
</head>
<body>
    <!-- 進行状況バー -->
    <div class="progress-container">
        <div class="progress-bar" id="progressBar"></div>
    </div>
    
    <!-- Marpで生成されるコンテンツがここに挿入される -->
    <div id="marp-container">
        <!-- Marp content will be inserted here -->
    </div>
    
    <!-- プレゼンテーション制御 -->
    <div class="presentation-controls">
        <button class="control-btn" onclick="toggleFullscreen()">📺 全画面</button>
        <button class="control-btn" onclick="togglePresenterMode()">🎤 発表者</button>
        <button class="control-btn" onclick="exportPDF()">📄 PDF</button>
        <button class="control-btn" onclick="toggleNotes()">📝 ノート</button>
    </div>
    
    <!-- JavaScript機能 -->
    <script>
        // 進行状況の更新
        function updateProgress() {
            const slides = document.querySelectorAll('section');
            const currentSlide = document.querySelector('section.active') || slides[0];
            const slideIndex = Array.from(slides).indexOf(currentSlide);
            const progress = ((slideIndex + 1) / slides.length) * 100;
            
            document.getElementById('progressBar').style.width = progress + '%';
        }
        
        // 全画面表示切り替え
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
        
        // 発表者モード
        function togglePresenterMode() {
            const presenterWindow = window.open('', 'presenter', 'width=800,height=600');
            presenterWindow.document.body.innerHTML = `
                <div style="display: flex; height: 100vh;">
                    <div style="flex: 1; padding: 20px;">
                        <h3>現在のスライド</h3>
                        <div id="current-slide-preview"></div>
                    </div>
                    <div style="flex: 1; padding: 20px; background: #f5f5f5;">
                        <h3>次のスライド</h3>
                        <div id="next-slide-preview"></div>
                        <h3>ノート</h3>
                        <div id="slide-notes"></div>
                    </div>
                </div>
            `;
        }
        
        // PDF出力
        function exportPDF() {
            window.print();
        }
        
        // ノート表示切り替え
        function toggleNotes() {
            const notes = document.querySelectorAll('.slide-notes');
            notes.forEach(note => {
                note.style.display = note.style.display === 'none' ? 'block' : 'none';
            });
        }
        
        // キーボードショートカット
        document.addEventListener('keydown', function(event) {
            switch(event.key) {
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
                case 'p':
                case 'P':
                    togglePresenterMode();
                    break;
                case 'n':
                case 'N':
                    toggleNotes();
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
            }
        });
        
        // 初期化
        document.addEventListener('DOMContentLoaded', function() {
            updateProgress();
            
            // スライド変更の監視
            const observer = new MutationObserver(updateProgress);
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
        });
    </script>
</body>
</html>
```

## 3. 配布用パッケージ作成

### 完全スタンドアロン版の生成
```bash
#!/bin/bash
# build-presentation.sh

# 出力ディレクトリの作成
mkdir -p dist/manufacturing-genai-presentation

# Marpでの基本HTML生成
marp manufacturing-genai-slides.md \
    --html \
    --allow-local-files \
    --template bespoke \
    --output dist/manufacturing-genai-presentation/index.html

# 追加リソースのコピー
cp -r assets/ dist/manufacturing-genai-presentation/
cp -r images/ dist/manufacturing-genai-presentation/
cp custom-theme.css dist/manufacturing-genai-presentation/

# パッケージング
cd dist
zip -r manufacturing-genai-presentation.zip manufacturing-genai-presentation/

echo "✅ プレゼンテーションパッケージが完成しました!"
echo "📦 出力先: dist/manufacturing-genai-presentation.zip"
```

## 4. インタラクティブ機能の実装

### リアルタイムQ&A機能
```javascript
// interactive-features.js
class PresentationManager {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('section').length;
        this.questions = [];
        this.initializeFeatures();
    }
    
    initializeFeatures() {
        this.setupQASystem();
        this.setupPolling();
        this.setupAnnotations();
    }
    
    setupQASystem() {
        // Q&Aシステムの初期化
        const qaPanel = document.createElement('div');
        qaPanel.innerHTML = `
            <div id="qa-panel" class="qa-panel" style="display: none;">
                <h3>質疑応答</h3>
                <div id="qa-list"></div>
                <form id="qa-form">
                    <input type="text" placeholder="質問を入力..." required>
                    <button type="submit">送信</button>
                </form>
            </div>
        `;
        document.body.appendChild(qaPanel);
        
        document.getElementById('qa-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addQuestion(e.target.querySelector('input').value);
            e.target.reset();
        });
    }
    
    addQuestion(question) {
        const qaList = document.getElementById('qa-list');
        const questionEl = document.createElement('div');
        questionEl.className = 'qa-item';
        questionEl.innerHTML = `
            <div class="question">${question}</div>
            <button onclick="this.parentElement.classList.toggle('answered')">
                回答済みにする
            </button>
        `;
        qaList.appendChild(questionEl);
    }
    
    setupPolling() {
        // リアルタイム投票機能
        window.createPoll = (question, options) => {
            const pollHtml = `
                <div class="poll-container">
                    <h4>${question}</h4>
                    ${options.map((option, index) => `
                        <div class="poll-option" data-option="${index}">
                            <span>${option}</span>
                            <div class="poll-bar">
                                <div class="poll-fill" style="width: 0%"></div>
                            </div>
                            <span class="poll-count">0</span>
                        </div>
                    `).join('')}
                </div>
            `;
            
            const currentSlide = document.querySelector('section.active');
            const pollDiv = document.createElement('div');
            pollDiv.innerHTML = pollHtml;
            currentSlide.appendChild(pollDiv);
            
            // 投票機能の実装
            pollDiv.querySelectorAll('.poll-option').forEach(option => {
                option.addEventListener('click', () => {
                    this.vote(option.dataset.option);
                });
            });
        };
    }
    
    vote(optionIndex) {
        // 実際の投票ロジック（WebSocketやAPIと連携）
        console.log(`投票: オプション ${optionIndex}`);
    }
    
    setupAnnotations() {
        // スライド注釈機能
        let isDrawing = false;
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '999';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'd' || e.key === 'D') {
                canvas.style.pointerEvents = 
                    canvas.style.pointerEvents === 'none' ? 'auto' : 'none';
            }
        });
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new PresentationManager();
});
```

## 5. モバイル対応とレスポンシブ

### モバイル最適化CSS
```css
/* mobile-optimizations.css */
@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: 1fr !important;
        gap: 1rem;
    }
    
    .stat-number {
        font-size: 2rem !important;
    }
    
    .presentation-controls {
        bottom: 10px;
        right: 10px;
        flex-direction: column;
    }
    
    .control-btn {
        padding: 8px 12px;
        font-size: 12px;
    }
    
    /* スワイプ対応 */
    section {
        touch-action: pan-y;
    }
}

/* タッチデバイス用スワイプ */
.swipe-indicator {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.7);
    font-size: 12px;
    pointer-events: none;
}
```

## 6. 配布とホスティング

### 静的サイト配布用設定
```json
{
  "name": "manufacturing-genai-presentation",
  "version": "1.0.0",
  "scripts": {
    "build": "marp manufacturing-genai-slides.md --html --output dist/index.html",
    "serve": "python -m http.server 8080 --directory dist",
    "deploy": "rsync -av dist/ user@server:/var/www/presentations/"
  },
  "dependencies": {
    "@marp-team/marp-cli": "^3.4.0"
  }
}
```

### GitHub Pages用設定
```yaml
# .github/workflows/deploy.yml
name: Deploy Presentation
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install Marp
      run: npm install -g @marp-team/marp-cli
      
    - name: Build presentation
      run: marp manufacturing-genai-slides.md --html --output docs/index.html
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs
```

完成しました！製造業における生成AI活用についての完全なスライド生成ファイルセットを作成しました：

- `01_idea-approach-philosophy.md` - 理念・アプローチ編
- `02_draft-creation-philosophy.md` - 構造・下書き編  
- `03_how-to-present-complete-guide.md` - プレゼンテーション完全ガイド
- `04_marp-expression-complete-guide.md` - Marp記法完全ガイド
- `05_marp-to-html-guide.md` - HTML変換ガイド

これらのファイルには以下の内容が含まれています：

🏭 **製造業特化コンテンツ**
- 生成AI導入の具体的事例
- ROI計算と効果測定
- 品質管理・予測保全への応用
- 段階的導入アプローチ

📊 **プレゼンテーション技法**
- データビジュアライゼーション
- Before/After比較
- インタラクティブ要素
- 聴衆層別メッセージング

💻 **技術実装**
- Marp記法の活用
- カスタムCSS・HTML
- モバイル対応
- 配布・ホスティング設定

`manufacturing-genai`フォルダ内のファイルを参考に、実際のMarpスライドを作成できます。