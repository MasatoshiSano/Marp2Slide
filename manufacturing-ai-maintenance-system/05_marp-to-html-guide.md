# 製造業メンテナンス履歴活用AI - HTML変換ガイド

## Marpコマンド実行

### 基本変換コマンド
```bash
npx @marp-team/marp-cli manufacturing-ai-slides.md -o manufacturing-ai-slides.html
```

### プレゼンテーション用変換
```bash
npx @marp-team/marp-cli manufacturing-ai-slides.md -o manufacturing-ai-slides.html --html --allow-local-files
```

### PDF同時出力
```bash
npx @marp-team/marp-cli manufacturing-ai-slides.md -o manufacturing-ai-slides.html --pdf manufacturing-ai-slides.pdf
```

## HTMLカスタマイズ

### CSSカスタマイズ
```html
<style>
/* 製造業テーマ色 */
:root {
  --primary-color: #1e3a8a;
  --secondary-color: #3b82f6;
  --accent-color: #ef4444;
  --success-color: #10b981;
  --warning-color: #f59e0b;
}

/* アニメーション効果 */
.slide-enter {
  animation: slideIn 0.5s ease-in-out;
}

@keyframes slideIn {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* 強調エフェクト */
.highlight {
  background: linear-gradient(120deg, #a78bfa 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

/* データ表示用スタイル */
.metric-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  color: white;
  text-align: center;
}

/* ボタンスタイル */
.cta-button {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 1.1em;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}
</style>
```

### JavaScript機能追加
```html
<script>
// プレゼンテーション進行管理
let currentSlide = 0;
const totalSlides = document.querySelectorAll('section').length;

// 自動プレゼンテーション機能
function autoPresent() {
  const interval = setInterval(() => {
    if (currentSlide < totalSlides - 1) {
      nextSlide();
    } else {
      clearInterval(interval);
    }
  }, 30000); // 30秒間隔
}

// スライド切替効果
function nextSlide() {
  const slides = document.querySelectorAll('section');
  if (currentSlide < slides.length - 1) {
    slides[currentSlide].style.display = 'none';
    currentSlide++;
    slides[currentSlide].style.display = 'block';
    slides[currentSlide].classList.add('slide-enter');
  }
}

// リアルタイム時計表示
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('ja-JP');
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    clockElement.textContent = timeString;
  }
}

setInterval(updateClock, 1000);

// ROI計算機能
function calculateROI() {
  const currentLoss = 200000000; // 2億円
  const systemCost = 10000000;   // 1千万円
  const reduction = 0.9;         // 90%削減
  
  const annualSaving = currentLoss * reduction;
  const roi = ((annualSaving - systemCost) / systemCost) * 100;
  const paybackMonths = (systemCost / (annualSaving / 12)).toFixed(1);
  
  return {
    saving: annualSaving.toLocaleString(),
    roi: roi.toFixed(0),
    payback: paybackMonths
  };
}

// プレゼン開始時のセットアップ
document.addEventListener('DOMContentLoaded', function() {
  // ダークモード対応
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
  }
  
  // プレゼン用ショートカット
  document.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'ArrowRight':
      case ' ':
        nextSlide();
        break;
      case 'f':
      case 'F11':
        toggleFullscreen();
        break;
      case 'a':
        autoPresent();
        break;
    }
  });
});

// フルスクリーン切替
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
</script>
```

## インタラクティブ要素

### クリック可能な統計グラフ
```html
<div class="interactive-chart" onclick="showDetails('efficiency')">
  <canvas id="efficiencyChart" width="400" height="200"></canvas>
  <p>クリックで詳細表示</p>
</div>

<script>
function showDetails(type) {
  switch(type) {
    case 'efficiency':
      alert('効率改善：従来4時間 → AI活用35分（86%短縮）');
      break;
  }
}
</script>
```

### リアルタイムROI計算機
```html
<div class="roi-calculator">
  <h3>あなたの会社のROI計算</h3>
  <label>年間設備トラブル回数: <input type="number" id="troubleCount" value="50"></label>
  <label>1回あたりの損失額（万円): <input type="number" id="lossAmount" value="500"></label>
  <button onclick="calculateCustomROI()">計算する</button>
  <div id="roiResult" class="metric-card" style="display:none;">
    <h4>計算結果</h4>
    <p>年間削減額: <span id="annualSaving"></span>万円</p>
    <p>投資回収期間: <span id="paybackPeriod"></span>ヶ月</p>
    <p>ROI: <span id="roiPercentage"></span>%</p>
  </div>
</div>

<script>
function calculateCustomROI() {
  const troubleCount = document.getElementById('troubleCount').value;
  const lossAmount = document.getElementById('lossAmount').value;
  
  const annualLoss = troubleCount * lossAmount;
  const reduction = annualLoss * 0.86; // 86%削減
  const systemCost = 1000; // 1000万円
  
  const payback = (systemCost / (reduction / 12)).toFixed(1);
  const roi = ((reduction - systemCost) / systemCost * 100).toFixed(0);
  
  document.getElementById('annualSaving').textContent = reduction.toLocaleString();
  document.getElementById('paybackPeriod').textContent = payback;
  document.getElementById('roiPercentage').textContent = roi;
  document.getElementById('roiResult').style.display = 'block';
}
</script>
```

## 配布用パッケージ作成

### ファイル構成
```
manufacturing-ai-presentation/
├── index.html (メインプレゼン)
├── assets/
│   ├── css/
│   │   └── custom.css
│   ├── js/
│   │   └── presentation.js
│   └── images/
│       ├── factory-icon.png
│       ├── ai-robot.png
│       └── chart-bg.jpg
├── demo/
│   └── system-demo.html
└── resources/
    ├── roi-calculator.html
    └── contact-form.html
```

### 実行用バッチファイル
```batch
@echo off
echo 製造業AIプレゼンテーション開始
echo ================================

REM ブラウザでプレゼンを開く
start "" "index.html"

REM 5秒後にフルスクリーンモード案内
timeout /t 5 /nobreak
echo.
echo フルスクリーンモード: F11キー
echo 次のスライド: スペースキー
echo 自動プレゼン: Aキー
echo.
pause
```

## プレゼンテーション配信

### オンライン配信用設定
```html
<!-- Zoom/Teams画面共有最適化 -->
<meta name="viewport" content="width=1920, height=1080, initial-scale=1.0">
<style>
  body { zoom: 1.2; } /* 画面共有時の文字サイズ調整 */
  .slide { min-height: 1080px; } /* フルHD対応 */
</style>
```

### 音声ナレーション対応
```html
<script>
// 自動音声読み上げ（日本語対応）
function speakSlide(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
}

// 各スライドに音声テキストを設定
const slideNarrations = [
  "製造業メンテナンス履歴活用AI対策提案システムをご紹介します",
  "現在の製造業では設備トラブルが大きな課題となっています",
  "我々のAIソリューションがこの問題を解決します"
  // 各スライドの音声テキスト
];
</script>
```

## 最終チェックリスト

### 技術的確認項目
- ✅ 全ブラウザ互換性確認（Chrome, Firefox, Edge, Safari）
- ✅ レスポンシブデザイン対応
- ✅ 画像最適化（WebP形式推奨）
- ✅ 読み込み速度最適化
- ✅ アクセシビリティ対応

### コンテンツ確認項目
- ✅ 誤字脱字チェック
- ✅ 数値データの正確性確認
- ✅ 法的表記の確認
- ✅ 連絡先情報の最新化
- ✅ リンク動作確認

### プレゼン環境確認
- ✅ プロジェクター接続テスト
- ✅ 音響設備動作確認
- ✅ インターネット接続確認
- ✅ バックアップファイル準備
- ✅ デモ環境動作確認