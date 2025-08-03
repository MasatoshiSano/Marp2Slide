---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
backgroundImage: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4MCIgaGVpZ2h0PSI3MjAiIHZpZXdCb3g9IjAgMCAxMjgwIDcyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9zdmc+')
---

<style>
:root {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #2c5aa0;
  --color-primary-600: #1e3d6f;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-secondary-50: #fff7ed;
  --color-secondary-100: #ffedd5;
  --color-secondary-200: #fed7aa;
  --color-secondary-300: #fdba74;
  --color-secondary-400: #fb923c;
  --color-secondary-500: #f39800;
  --color-secondary-600: #cc7a00;
  --color-secondary-700: #c2410c;
  --color-secondary-800: #9a3412;
  --color-secondary-900: #7c2d12;
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;
  --font-size-xs: clamp(0.75rem, 1.5vw, 1rem);
  --font-size-sm: clamp(1rem, 2vw, 1.25rem);
  --font-size-base: clamp(1.125rem, 2.5vw, 1.5rem);
  --font-size-lg: clamp(1.5rem, 3vw, 2rem);
  --font-size-xl: clamp(2rem, 4vw, 2.5rem);
  --font-size-2xl: clamp(2.5rem, 5vw, 3.5rem);
  --font-size-3xl: clamp(3rem, 6vw, 4rem);
  --font-size-4xl: clamp(3.5rem, 7vw, 4.5rem);
  --font-size-5xl: clamp(4rem, 8vw, 5rem);
  --font-size-6xl: clamp(4.5rem, 9vw, 6rem);
  --font-weight-thin: 100;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;
  --spacing-0: 0px;
  --spacing-1: clamp(0.25rem, 1vw, 0.5rem);
  --spacing-2: clamp(0.5rem, 1.5vw, 1rem);
  --spacing-3: clamp(0.75rem, 2vw, 1.5rem);
  --spacing-4: clamp(1rem, 2.5vw, 2rem);
  --spacing-5: clamp(1.25rem, 3vw, 2.5rem);
  --spacing-6: clamp(1.5rem, 3vw, 3rem);
  --spacing-7: clamp(1.75rem, 3.5vw, 3.5rem);
  --spacing-8: clamp(2rem, 4vw, 4rem);
  --spacing-9: clamp(2.25rem, 4.5vw, 4.5rem);
  --spacing-10: clamp(2.5rem, 5vw, 5rem);
  --spacing-11: clamp(2.75rem, 5.5vw, 5.5rem);
  --spacing-12: clamp(3rem, 6vw, 6rem);
  --spacing-14: clamp(3.5rem, 7vw, 7rem);
  --spacing-16: clamp(4rem, 8vw, 8rem);
  --spacing-20: clamp(5rem, 10vw, 10rem);
  --spacing-24: clamp(6rem, 12vw, 12rem);
  --spacing-28: clamp(7rem, 14vw, 14rem);
  --spacing-32: clamp(8rem, 16vw, 16rem);
  --spacing-36: clamp(9rem, 18vw, 18rem);
  --spacing-40: clamp(10rem, 20vw, 20rem);
  --spacing-44: clamp(11rem, 22vw, 22rem);
  --spacing-48: clamp(12rem, 24vw, 24rem);
  --spacing-52: clamp(13rem, 26vw, 26rem);
  --spacing-56: clamp(14rem, 28vw, 28rem);
  --spacing-60: clamp(15rem, 30vw, 30rem);
  --spacing-64: clamp(16rem, 32vw, 32rem);
  --spacing-72: clamp(18rem, 36vw, 36rem);
  --spacing-80: clamp(20rem, 40vw, 40rem);
  --spacing-96: clamp(24rem, 48vw, 48rem);
  --spacing-px: 1px;
  --spacing-0.5: clamp(0.125rem, 0.5vw, 0.25rem);
  --spacing-1.5: clamp(0.375rem, 1.5vw, 0.75rem);
  --spacing-2.5: clamp(0.625rem, 2vw, 1.25rem);
  --spacing-3.5: clamp(0.875rem, 2.5vw, 1.75rem);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --shadow-none: 0 0 #0000;
  --radius-none: 0px;
  --radius-sm: 0.125rem;
  --radius-base: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
}

/* Marp-specific styling */
section {
  font-family: "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif;
  font-size: 22px;
  line-height: 1.6;
  color: var(--text-primary);
  padding: 40px 60px;
}

h1, h2, h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

h1 { font-size: 32px; }
h2 { font-size: 28px; }
h3 { font-size: 24px; }

.title-slide {
  text-align: center;
  padding: 60px 40px;
}

.split-layout {
  display: flex;
  gap: 2rem;
}

.split-left, .split-right {
  flex: 1;
}

.center-layout {
  text-align: center;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline-item {
  position: relative;
  padding: 1rem 0;
  border-left: 2px solid var(--primary-color);
  padding-left: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 1.5rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary-color);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.metric-card {
  background: var(--background-alt);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  text-align: center;
}

.step-item {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--background-alt);
  border-radius: 4px;
  border-left: 4px solid var(--primary-color);
}
</style>

<!-- _class: title-slide -->
<!-- _style: "text-align: center; padding: 60px 40px;" -->

# Marpで表現するための完全ガイド

**推定所要時間: 1分 | スライド数: 107**

## 主要内容

1. Marpで表現するための完全ガイド
2. 📖 このガイドについて
3. 🎯 Marp表現の5つの黄金ルール
4. 1. **1スライド1メッセージの徹底**
5. 2. **タイトル下の概要文配置**
... 他 101 セクション

---

## Marpで表現するための完全ガイド

**ドラフトからMarpへの変換で絶対に注意すべきこと**

> **ドラフトからMarpへの変換で絶対に注意すべきこと**
---

## 📖 このガイドについて

**📖 このガイドについてに関する重要な情報を整理して説明します**

**用途**: Markdownドキュメントを効果的なMarpスライドに変換するための設計・実装ガイド

**対象出力**: 
- Marp → PDF/PPTX (プレゼンテーション用)
- Marp → HTML (基本的なWeb表示)

**関連ガイド**: 
- HTML出力の詳細な実装 → `marp-to-html-guide.md`
- コンテンツ駆動型レイアウト → `content-driven-layout-guide.md`
---

## 🎯 Marp表現の5つの黄金ルール

**🎯 Marp表現の5つの黄金ルールに関する重要な情報を整理して説明します**


---

## 1. **1スライド1メッセージの徹底**

**1. **1スライド1メッセージの徹底**に関する重要な情報を整理して説明します**


---

<!-- _class: split-layout -->
## 2. **タイトル下の概要文配置**

**2. **タイトル下の概要文配置**に関する重要な情報を整理して説明します**


---

## 3. **レイアウトバリエーションで単調さ回避**

**3. **レイアウトバリエーションで単調さ回避**に関する重要な情報を整理して説明します**


---

<!-- _class: visual-layout -->
## 4. **視認性・可読性の最優先**

**4. **視認性・可読性の最優先**に関する重要な情報を整理して説明します**


---

## 5. **Marp制約の理解と回避**

**5. **Marp制約の理解と回避**に関する重要な情報を整理して説明します**

---
---

<!-- _class: visual-layout -->
## 📋 Marp変換時の重要注意事項（15項目）

**📋 Marp変換時の重要注意事項（15項目）に関する重要な情報を整理して説明します**


---

## **A. 構造・分割関連（4項目）**

****A. 構造・分割関連（4項目）**に関する重要な情報を整理して説明します**


---

## **1. 適切なスライド分割**

****1. 適切なスライド分割**に関する重要な情報を整理して説明します**

```markdown
❌ 悪い例：情報過多
---

<!-- _class: split-layout -->
## セクション1

**セクション1に関する重要な情報を整理して説明します**

- 内容1（詳細説明が3行）
- 内容2（詳細説明が3行）
- 内容3（詳細説明が3行）
- 内容4（詳細説明が3行）
- 内容5（詳細説明が3行）

✅ 良い例：適切な分割
---

<!-- _class: center-layout -->
## セクション1：概要

**このスライドでは、5つの主要要素の全体像を示します。**

**このスライドでは、<span style="font-size: 36px; color: var(--primary-color); font-weight: bold;">5</span>つの主要要素の全体像を示します。**
- 内容<span style="font-size: 36px; color: var(--primary-color); font-weight: bold;">1</span>
- 内容<span style="font-size: 36px; color: var(--primary-color); font-weight: bold;">2</span>
- 内容<span style="font-size: 36px; color: var(--primary-color); font-weight: bold;">3</span>
- 内容<span style="font-size: 36px; color: var(--primary-color); font-weight: bold;">4</span>
- 内容<span style="font-size: 36px; color: var(--primary-color); font-weight: bold;">5</span>

---
---

<!-- _class: center-layout -->
## セクション1-1：詳細解説

**内容1と2について、具体例とデータで詳しく説明します。**

**内容<span style="font-size: 36px; color: var(--primary-color); font-weight: bold;">1</span>と<span style="font-size: 36px; color: var(--primary-color); font-weight: bold;">2</span>について、具体例とデータで詳しく説明します。**
---

<!-- _class: split-layout -->
## 内容1の詳細

**内容1の詳細に関する重要な情報を整理して説明します**

（詳細説明）
---

<!-- _class: split-layout -->
## 内容2の詳細

**内容2の詳細に関する重要な情報を整理して説明します**

（詳細説明）
```
---

<!-- _class: center-layout -->
## **2. 論理的な情報階層**

****2. 論理的な情報階層**に関する重要な情報を整理して説明します**

```markdown
---

<!-- _class: split-layout -->
## メインタイトル（h1）

**メインタイトル（h1）に関する重要な情報を整理して説明します**


---

## スライドタイトル（h2）

**スライドタイトル（h2）に関する重要な情報を整理して説明します**

**概要文（太字）**
---

<!-- _class: split-layout -->
## セクション見出し（h3）

**セクション見出し（h3）に関する重要な情報を整理して説明します**


---

## 詳細項目（h4）

**詳細項目（h4）に関する重要な情報を整理して説明します**

- 箇条書き項目
  - サブ項目
```
---

<!-- _class: split-layout -->
## **3. スライド間の連続性確保**

****3. スライド間の連続性確保**に関する重要な情報を整理して説明します**

```markdown
---

## 前スライドの振り返り + 今回の内容

**前回：基本概念を確認 → 今回：実践的応用方法を解説**

**前回：基本概念を確認 → 今回：実践的応用方法を解説**
---

<!-- _class: split-layout -->
## 今回の内容 + 次回の予告

**今回の内容 + 次回の予告に関する重要な情報を整理して説明します**

**今回：設計手法 → 次回：実装テクニック**
```
---

## **4. セクション間のナビゲーション**

****4. セクション間のナビゲーション**に関する重要な情報を整理して説明します**

```markdown
<!-- パンくずリスト -->
---

## 第2章：設計手法 > 2-1：基本設計

**基本設計の3つのステップを順番に説明します。**

**基本設計の3つのステップを順番に説明します。**

<!-- 進捗表示 -->
---

## プロジェクト計画（3/5）

**今回は実装フェーズの詳細スケジュールを確認します。**

**今回は実装フェーズの詳細スケジュールを確認します。**
```
---

## **B. 視認性・可読性関連（5項目）**

****B. 視認性・可読性関連（5項目）**に関する重要な情報を整理して説明します**


---

## **5. フォントサイズの適切な設定**

****5. フォントサイズの適切な設定**の全体像と主要なポイントを説明します**

### 主要ポイント

- **固定サイズ**: Marp → PDF/PPTX出力時
- **レスポンシブサイズ**: Marp → HTML出力時

---

## **5. フォントサイズの適切な設定**

****5. フォントサイズの適切な設定**の詳細内容を説明します**

```css
/* Marp専用：固定サイズ設定（PDF/PPTX出力対応） */
section { font-size: 22px; }  /* 読みやすい基本サイズ */
h1 { font-size: 32px; }      /* タイトルは十分大きく */
h2 { font-size: 28px; }      /* スライドタイトル */
h3 { font-size: 24px; }      /* セクション見出し */

/* 強調用 */
.large-text { font-size: 36px; }  /* 重要な数値など */
.small-text { font-size: 18px; }  /* 補足情報 */

/* HTML出力用：レスポンシブサイズ（HTML専用） */
/* 詳細は .tmp/marp-to-html-guide.md を参照 */
:root {
  --font-size-base: clamp(1.125rem, 2.5vw, 1.5rem);
  --font-size-lg: clamp(1.5rem, 3vw, 2rem);
  --font-size-xl: clamp(2rem, 4vw, 2.5rem);
}
```
---

## **5. フォントサイズの適切な設定** (2)

****5. フォントサイズの適切な設定**の詳細内容を説明します**

**使い分けガイド：**
- **固定サイズ**: Marp → PDF/PPTX出力時
- **レスポンシブサイズ**: Marp → HTML出力時
---

## **6. 色彩設計とコントラスト**

****6. 色彩設計とコントラスト**の全体像と主要なポイントを説明します**

### 主要ポイント

- 赤と緑の隣接使用（色覚異常対応）
- 黄色背景に白文字（コントラスト不足）
- 薄いグレー文字（可読性低下）
- ダークブルー背景に白文字
- 白背景にダークグレー文字

---

## **6. 色彩設計とコントラスト**

****6. 色彩設計とコントラスト**の詳細内容を説明します**

```markdown
<!-- 統一カラーパレット（HTML変換ガイドと共通） -->
<style>
:root {
  /* プライマリカラー */
  --primary-color: #2c5aa0;
  --primary-light: #4a7bc8;
  --primary-dark: #1e3d6f;
  
  /* セカンダリカラー */
  --secondary-color: #f39800;
  --secondary-light: #ffb347;
  --secondary-dark: #cc7a00;
  
  /* ステータスカラー */
  --success-color: #4ecdc4;
  --warning-color: #ff6b6b;
  
  /* テキストカラー */
  --text-primary: #333333;
  --text-secondary: #666666;
  --text-muted: #999999;
  
  /* 背景カラー */
  --background: #ffffff;
  --background-alt: #f8f9fa;
  --border: #e9ecef;
}

.primary-color { color: var(--primary-color); }
.secondary-color { color: var(--secondary-color); }
.success-color { color: var(--success-color); }
.warning-color { color: var(--warning-color); }
.text-gray { color: var(--text-secondary); }
</style>

❌ 避けるべき色の組み合わせ
- 赤と緑の隣接使用（色覚異常対応）
- 黄色背景に白文字（コントラスト不足）
- 薄いグレー文字（可読性低下）

✅ 推奨する色の組み合わせ
- ダークブルー背景に白文字
- 白背景にダークグレー文字
- アクセントカラーは全体の20%以下
```
---

## **7. 余白とレイアウト調整**

****7. 余白とレイアウト調整**に関する重要な情報を整理して説明します**

```markdown
<!-- 適切な余白設定 -->
<!-- _style: "padding: 40px 60px;" -->
---

<!-- _class: timeline-layout -->
## 余白たっぷりスライド

**余白たっぷりスライドに関する重要な情報を整理して説明します**

<!-- 内容が多い場合の調整 -->
<!-- _style: "padding: 40px 60px 45px 60px; font-size: 20px; line-height: 1.4;" -->
---

<!-- _class: steps-layout -->
## 情報密度の高いスライド

**情報密度の高いスライドに関する重要な情報を整理して説明します**

<!-- 中央揃えレイアウト -->
<!-- _style: "text-align: center; padding: 60px 40px;" -->
---

<!-- _class: visual-layout -->
## 中央配置スライド

**中央配置スライドに関する重要な情報を整理して説明します**

```
---

<!-- _class: split-layout -->
## **8. 行数制限と調整ルール**

****8. 行数制限と調整ルール**に関する重要な情報を整理して説明します**

```markdown
基本ルール：
- 5行以下：調整不要
- 6-11行：軽度調整（padding調整、font-size: 20px）
- 12-23行：左右分割レイアウト必須
- 24行以上：複数スライドに分割必須

自動判定基準：
- テキスト行数をカウント（空行・タイトル・概要文除く）
- リスト項目数を確認（8項目以上で調整検討）
- コードブロック10行以上で分割またはfont-size調整
- 総文字数800文字超過で調整検討
- 長い文章行（100文字以上）の存在確認
```
---

<!-- _class: split-layout -->
## **9. 画像・メディア最適化**

****9. 画像・メディア最適化**の重要な数値とデータを詳しく解説します**

```markdown
<!-- 画像サイズ調整 -->
![w:600](image.jpg)          <!-- 幅600px指定 -->
![h:400](image.jpg)          <!-- 高さ400px指定 -->
![w:300 h:200](image.jpg)    <!-- 幅高さ両方指定 -->

<!-- 背景画像 -->
![bg](background.jpg)        <!-- 全面背景 -->
![bg right:40%](side.jpg)    <!-- 右40%に背景 -->
![bg left](left.jpg)         <!-- 左半分に背景 -->
![bg brightness:0.6](dim.jpg) <!-- 明度調整 -->

<!-- 画像配置 -->
![center](centered.jpg)      <!-- 中央配置 -->
![right](right-align.jpg)    <!-- 右寄せ -->
```
---

## **C. Marp特有の制約と対策（3項目）**

****C. Marp特有の制約と対策（3項目）**に関する重要な情報を整理して説明します**


---

<!-- _class: split-layout -->
## **10. HTMLタグとCSS制限への対策**

****10. HTMLタグとCSS制限への対策**に関する重要な情報を整理して説明します**

```markdown
❌ 使用できない・推奨しないもの
- <iframe>タグ（セキュリティ制約）
- JavaScript（実行されない）
- 外部CSSファイル読み込み
- 複雑なCSSアニメーション
- position: fixed（期待通り動作しない）

✅ 安全に使用できるもの
- 基本HTMLタグ（div, span, p, h1-h6）
- インラインCSS
- Flexbox レイアウト
- CSS Grid（基本的な使用）
- 色、フォント、サイズ調整
```
---

## **11. ブラウザ・デバイス互換性**

****11. ブラウザ・デバイス互換性**に関する重要な情報を整理して説明します**

```markdown
考慮すべき環境：
- Chrome, Firefox, Safari, Edge
- Windows, Mac, Linux
- プロジェクター表示（解像度1024x768以上）
- 印刷出力（白黒・カラー両対応）

対策：
- Web Safe フォントの使用
- 相対単位（em, %）の活用
- 印刷時のCSS調整
- 高解像度画像の準備
```
---

## **12. エクスポート時の注意点**

****12. エクスポート時の注意点**の全体像と主要なポイントを説明します**

### 主要ポイント

- テキストが画像として埋め込まれる
- 編集には Marp Web Editor が必要
- フォント依存性に注意
- 複雑なレイアウトの簡略化
- --allow-local-files オプション必須

---

## **12. エクスポート時の注意点**

****12. エクスポート時の注意点**の詳細内容を説明します**

```markdown
PDF/PPTX出力時の制限：
- テキストが画像として埋め込まれる
- 編集には Marp Web Editor が必要
- フォント依存性に注意
- 複雑なレイアウトの簡略化

HTML出力時の基本考慮点：
- --allow-local-files オプション必須
- 画像パスの相対参照確認
- ブラウザでの表示確認

HTML出力の詳細な実装・最適化：
→ marp-to-html-guide.md を参照
- インタラクティブ機能実装
- レスポンシブ対応
- アクセシビリティ強化
- パフォーマンス最適化
```
---

## **D. ユーザビリティ・アクセシビリティ（3項目）**

****D. ユーザビリティ・アクセシビリティ（3項目）**に関する重要な情報を整理して説明します**


---

<!-- _class: split-layout -->
## **13. キーボードナビゲーション**

****13. キーボードナビゲーション**に関する重要な情報を整理して説明します**

```markdown
標準ショートカット：
- → or Space：次のスライド
- ← or Backspace：前のスライド
- Home：最初のスライド
- End：最後のスライド
- f：フルスクリーン切り替え
- o：概要表示

設計時の考慮：
- スライド番号の表示
- 進捗表示の実装
- 目次からのジャンプ機能
```
---

## **14. アクセシビリティ対応**

****14. アクセシビリティ対応**の重要な数値とデータを詳しく解説します**

```markdown
<!-- 画像に代替テキスト -->
![キーボードナビゲーションの説明図](navigation.png)

<!-- 色以外の情報提供 -->
<span style="color: red;">重要</span> → ❌ 悪い
<span style="color: red; font-weight: bold;">⚠️ 重要</span> → ✅ 良い

<!-- コントラスト比の確保 -->
背景白(#ffffff) + 文字黒(#333333) = コントラスト比12.6:1 ✅
背景グレー(#f0f0f0) + 文字薄グレー(#999999) = コントラスト比2.8:1 ❌

<!-- フォントサイズの最小値 -->
最小フォントサイズ：18px以上推奨
```
---

<!-- _class: split-layout -->
## **15. プレゼンテーション実行時の配慮**

****15. プレゼンテーション実行時の配慮**の重要な数値とデータを詳しく解説します**

```markdown
発表者向け機能：
- スピーカーノートの活用
<!-- これはスピーカーノートです。聞き手には見えません。 -->

- 発表時間の管理
<!-- このスライドは2分で説明 -->

- 質疑応答への準備
<!-- よくある質問：「コストはどの程度？」→ 具体的数値を準備 -->

聞き手への配慮：
- 文字サイズの十分な確保
- 情報量の適切な調整
- 視覚的な飽きの防止
```

---
---

## 🎨 レイアウトバリエーション完全版

**🎨 レイアウトバリエーション完全版に関する重要な情報を整理して説明します**

> **HTML実装方法**: これらのレイアウトをHTMLで実装する方法については `marp-to-html-guide.md` を参照してください。ここではMarpでの記述方法を解説します。
---

## **基本レイアウト（8パターン）**

****基本レイアウト（8パターン）**に関する重要な情報を整理して説明します**


---

## **1. 標準レイアウト**

****1. 標準レイアウト**に関する重要な情報を整理して説明します**

```markdown
---

## スライドタイトル

**スライドタイトルに関する重要な情報を整理して説明します**

**概要文をここに配置**
---

## セクション1

**セクション1に関する重要な情報を整理して説明します**

- 内容1
- 内容2
---

## セクション2

**セクション2に関する重要な情報を整理して説明します**

- 内容1
- 内容2
```
---

## **2. 左右分割レイアウト**

****2. 左右分割レイアウト**に関する重要な情報を整理して説明します**

```markdown
<!-- _class: split-layout -->
---

## 比較・対比スライド

**2つの手法を並べて比較し、それぞれの特徴を明確にします。**

**2つの手法を並べて比較し、それぞれの特徴を明確にします。**

<div class="content-container">
<div class="split-left">
---

## 手法A

**手法Aに関する重要な情報を整理して説明します**

- 特徴1
- 特徴2
- 特徴3

</div>
<div class="split-right">
---

## 手法B

**手法Bに関する重要な情報を整理して説明します**

- 特徴1
- 特徴2
- 特徴3

</div>
</div>
```
---

## **3. 中央集中レイアウト**

****3. 中央集中レイアウト**に関する重要な情報を整理して説明します**

```markdown
<!-- _style: "text-align: center; padding: 80px 40px;" -->
---

## 重要メッセージ

**このスライドで最も重要なポイントを強調表示します。**

**このスライドで最も重要なポイントを強調表示します。**

<div style="font-size: 48px; color: #ff6b6b; margin: 40px 0;">
核心メッセージ
</div>

詳細説明をここに記載
```
---

## **4. 画像背景レイアウト**

****4. 画像背景レイアウト**に関する重要な情報を整理して説明します**

```markdown
![bg brightness:0.6](background.jpg)

<!-- _style: "color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);" -->
---

## 画像背景スライド

**背景画像を効果的に活用したレイアウトの例です。**

**背景画像を効果的に活用したレイアウトの例です。**
---

## 主要ポイント

**主要ポイントに関する重要な情報を整理して説明します**

- ポイント1
- ポイント2
- ポイント3

<!-- _footer: "画像出典：Unsplash" -->
```
---

## **5. グリッドレイアウト**

****5. グリッドレイアウト**に関する重要な情報を整理して説明します**

```markdown
---

<!-- _class: split-layout -->
## 4つの要素

**重要な4つの要素をバランスよく配置して説明します。**

**重要な4つの要素をバランスよく配置して説明します。**

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 40px 0;">

<div style="padding: 20px; background: #f0f0f0; border-radius: 8px;">
<h3>要素1</h3>
<p>説明文</p>
</div>

<div style="padding: 20px; background: #f0f0f0; border-radius: 8px;">
<h3>要素2</h3>
<p>説明文</p>
</div>

<div style="padding: 20px; background: #f0f0f0; border-radius: 8px;">
<h3>要素3</h3>
<p>説明文</p>
</div>

<div style="padding: 20px; background: #f0f0f0; border-radius: 8px;">
<h3>要素4</h3>
<p>説明文</p>
</div>

</div>
```
---

## **6. 表組みレイアウト**

****6. 表組みレイアウト**に関する重要な情報を整理して説明します**

```markdown
---

## データ比較表

**データ比較表の全体像と主要なポイントを説明します**

### 概要

- **3つのプランの特徴を表形式で比較します
- **

| 機能 | ベーシック | スタンダード | プレミアム |
|------|------------|--------------|------------|
| **容量** | 10GB | 100GB | 無制限 |
| **ユーザー数** | 5人 | 50人 | 無制限 |
| **サポート** | メール | メール+チャット | 24時間対応 |
| **料金/月** | ¥1,000 | ¥5,000 | ¥15,000 |

<style scoped>
table {
  font-size: 20px;
  margin: 30px auto;
  border-collapse: collapse;
}
th, td {
  padding: 12px 20px;
  border: 1px solid #ddd;
  text-align: center;
}
th {
  background: #4ecdc4;
  color: white;
  font-weight: bold;
}
td:first-child {
  background: #f9f9f9;
  font-weight: bold;
}
</style>
```

---

## データ比較表

**データ比較表の詳細内容を説明します**

**3つのプランの特徴を表形式で比較します。**

| 機能 | ベーシック | スタンダード | プレミアム |
|------|------------|--------------|------------|
| **容量** | 10GB | 100GB | 無制限 |
| **ユーザー数** | 5人 | 50人 | 無制限 |
| **サポート** | メール | メール+チャット | 24時間対応 |
| **料金/月** | ¥1,000 | ¥5,000 | ¥15,000 |
---

## データ比較表 (2)

**データ比較表の詳細内容を説明します**

<style scoped>
table {
  font-size: 20px;
  margin: 30px auto;
  border-collapse: collapse;
}
th, td {
  padding: 12px 20px;
  border: 1px solid #ddd;
  text-align: center;
}
th {
  background: #4ecdc4;
  color: white;
  font-weight: bold;
}
td:first-child {
  background: #f9f9f9;
  font-weight: bold;
}
</style>
```
---

## **7. フローチャート型**

****7. フローチャート型**に関する重要な情報を整理して説明します**

```markdown
---

## 意思決定フロー

**意思決定フローの全体像と主要なポイントを説明します**

### 概要

- **プロジェクト開始までの意思決定プロセスを図示します
- **

<div style="text-align: center; margin: 40px 0;">
<div style="display: inline-block; padding: 15px 30px; background: #4ecdc4; color: white; border-radius: 25px; margin: 10px;">
要件定義
</div>
<div style="margin: 20px 0; font-size: 24px;">↓</div>
<div style="display: inline-block; padding: 15px 30px; background: #f39800; color: white; border-radius: 25px; margin: 10px;">
技術検討
</div>
<div style="margin: 20px 0; font-size: 24px;">↓</div>
<div style="display: inline-block; padding: 10px 20px; border: 2px solid #ff6b6b; color: #ff6b6b; border-radius: 20px; margin: 10px;">
予算承認
- </div>
<div style="display: flex; justify-content: center; gap: 60px; margin: 20px 0;">
<div style="text-align: center;">
<div style="font-size: 24px; color: #4ecdc4;">YES ↓</div>
<div style="display: inline-block; padding: 15px 30px; background: #4ecdc4; color: white; border-radius: 25px; margin: 10px;">
プロジェクト開始
</div>
</div>
<div style="text-align: center;">
<div style="font-size: 24px; color: #ff6b6b;">NO ↓</div>
<div style="display: inline-block; padding: 15px 30px; background: #ff6b6b; color: white; border-radius: 25px; margin: 10px;">
要件見直し
</div>
</div>
</div>
</div>
```

---

## 意思決定フロー

**意思決定フローの詳細内容を説明します**

**プロジェクト開始までの意思決定プロセスを図示します。**
---

## 意思決定フロー (2)

**意思決定フローの詳細内容を説明します**

<div style="text-align: center; margin: 40px 0;">
<div style="display: inline-block; padding: 15px 30px; background: #4ecdc4; color: white; border-radius: 25px; margin: 10px;">
要件定義
</div>
<div style="margin: 20px 0; font-size: 24px;">↓</div>
<div style="display: inline-block; padding: 15px 30px; background: #f39800; color: white; border-radius: 25px; margin: 10px;">
技術検討
</div>
<div style="margin: 20px 0; font-size: 24px;">↓</div>
<div style="display: inline-block; padding: 10px 20px; border: 2px solid #ff6b6b; color: #ff6b6b; border-radius: 20px; margin: 10px;">
予算承認？
</div>
<div style="display: flex; justify-content: center; gap: 60px; margin: 20px 0;">
<div style="text-align: center;">
<div style="font-size: 24px; color: #4ecdc4;">YES ↓</div>
<div style="display: inline-block; padding: 15px 30px; background: #4ecdc4; color: white; border-radius: 25px; margin: 10px;">
プロジェクト開始
</div>
</div>
<div style="text-align: center;">
<div style="font-size: 24px; color: #ff6b6b;">NO ↓</div>
<div style="display: inline-block; padding: 15px 30px; background: #ff6b6b; color: white; border-radius: 25px; margin: 10px;">
要件見直し
</div>
</div>
</div>
</div>
```
---

## **8. アコーディオン風レイアウト**

****8. アコーディオン風レイアウト**に関する重要な情報を整理して説明します**

```markdown
---

<!-- _class: split-layout -->
## FAQ セクション

**FAQ セクションの構造と関係性について体系的に説明します**

**よくある質問を段階的に表示する形式です。**

<div style="margin: 30px 0;">
<details style="border: 1px solid #ddd; margin: 10px 0; border-radius: 8px;">
<summary style="padding: 20px; background: #f5f5f5; cursor: pointer; font-weight: bold; border-radius: 8px;">
Q1. サービスの利用開始までどのくらいかかりますか？
</summary>
<div style="padding: 20px; background: white;">
<p>お申し込みから3営業日以内にアカウントを発行し、利用開始いただけます。</p>
</div>
</details>

<details style="border: 1px solid #ddd; margin: 10px 0; border-radius: 8px;">
<summary style="padding: 20px; background: #f5f5f5; cursor: pointer; font-weight: bold; border-radius: 8px;">
Q2. データの移行は必要ですか？
</summary>
<div style="padding: 20px; background: white;">
<p>既存システムからのデータ移行は専任チームが無料でサポートいたします。</p>
</div>
</details>
</div>

<!-- 注意：HTMLエクスポート時のみ動作します -->
```
---

## **特殊レイアウト（3パターン）**

****特殊レイアウト（3パターン）**に関する重要な情報を整理して説明します**


---

## **9. タイムライン型**

****9. タイムライン型**に関する重要な情報を整理して説明します**

```markdown
---

## プロジェクト進行

**プロジェクト進行の全体像と主要なポイントを説明します**

### 概要

- **3段階のプロジェクト進行を時系列で示します
- **

<div style="display: flex; justify-content: space-between; align-items: center; margin: 40px 0;">
<div style="text-align: center;">
<div style="width: 100px; height: 100px; background: #4ecdc4; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin: 0 auto;">Phase 1</div>
<p>計画</p>
</div>
<div style="font-size: 30px; color: #999;">→</div>
<div style="text-align: center;">
<div style="width: 100px; height: 100px; background: #ff6b6b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin: 0 auto;">Phase 2</div>
<p>実行</p>
</div>
<div style="font-size: 30px; color: #999;">→</div>
<div style="text-align: center;">
<div style="width: 100px; height: 100px; background: #f39800; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin: 0 auto;">Phase 3</div>
<p>評価</p>
</div>
</div>
```

---

## プロジェクト進行

**プロジェクト進行の詳細内容を説明します**

**3段階のプロジェクト進行を時系列で示します。**
---

## プロジェクト進行 (2)

**プロジェクト進行の詳細内容を説明します**

<div style="display: flex; justify-content: space-between; align-items: center; margin: 40px 0;">
<div style="text-align: center;">
<div style="width: 100px; height: 100px; background: #4ecdc4; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin: 0 auto;">Phase 1</div>
<p>計画</p>
</div>
<div style="font-size: 30px; color: #999;">→</div>
<div style="text-align: center;">
<div style="width: 100px; height: 100px; background: #ff6b6b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin: 0 auto;">Phase 2</div>
<p>実行</p>
</div>
<div style="font-size: 30px; color: #999;">→</div>
<div style="text-align: center;">
<div style="width: 100px; height: 100px; background: #f39800; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; margin: 0 auto;">Phase 3</div>
<p>評価</p>
</div>
</div>
```
---

## **10. カード型**

****10. カード型**に関する重要な情報を整理して説明します**

```markdown
---

<!-- _class: split-layout -->
## サービス紹介

**3つのサービスをカード形式で分かりやすく紹介します。**

**3つのサービスをカード形式で分かりやすく紹介します。**

<div style="display: flex; gap: 20px; margin: 40px 0;">

<div style="flex: 1; padding: 30px; border: 2px solid #4ecdc4; border-radius: 12px; text-align: center;">
<div style="font-size: 48px; margin-bottom: 20px;">🚀</div>
<h3>高速処理</h3>
<p>従来比3倍の処理速度を実現</p>
</div>

<div style="flex: 1; padding: 30px; border: 2px solid #ff6b6b; border-radius: 12px; text-align: center;">
<div style="font-size: 48px; margin-bottom: 20px;">🔒</div>
<h3>高セキュリティ</h3>
<p>金融業界標準の暗号化技術</p>
</div>

<div style="flex: 1; padding: 30px; border: 2px solid #f39800; border-radius: 12px; text-align: center;">
<div style="font-size: 48px; margin-bottom: 20px;">💰</div>
<h3>コスト削減</h3>
<p>運用コスト50%削減を実現</p>
</div>

</div>
```
---

## **11. ダッシュボード型**

****11. ダッシュボード型**に関する重要な情報を整理して説明します**

```markdown
---

## KPI ダッシュボード

**KPI ダッシュボードの全体像と主要なポイントを説明します**

### 概要

- **主要指標を一覧で確認できるダッシュボード形式です
- **

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin: 40px 0;">

<div style="background: linear-gradient(135deg, #4ecdc4, #44a08d); color: white; padding: 30px; border-radius: 12px; text-align: center;">
<div style="font-size: 36px; font-weight: bold;">150億円</div>
<div>年間売上</div>
<div style="font-size: 14px; margin-top: 10px;">前年比 +25% ↗</div>
</div>

<div style="background: linear-gradient(135deg, #ff6b6b, #ee5a52); color: white; padding: 30px; border-radius: 12px; text-align: center;">
<div style="font-size: 36px; font-weight: bold;">98.5%</div>
<div>顧客満足度</div>
<div style="font-size: 14px; margin-top: 10px;">目標達成 ✓</div>
</div>

<div style="background: linear-gradient(135deg, #f39800, #e67e22); color: white; padding: 30px; border-radius: 12px; text-align: center;">
<div style="font-size: 36px; font-weight: bold;">1,250</div>
<div>新規顧客数</div>
<div style="font-size: 14px; margin-top: 10px;">月次目標達成 ✓</div>
</div>

</div>
```

---

---

## KPI ダッシュボード

**KPI ダッシュボードの詳細内容を説明します**

**主要指標を一覧で確認できるダッシュボード形式です。**

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin: 40px 0;">

<div style="background: linear-gradient(135deg, #4ecdc4, #44a08d); color: white; padding: 30px; border-radius: 12px; text-align: center;">
<div style="font-size: 36px; font-weight: bold;">150億円</div>
<div>年間売上</div>
<div style="font-size: 14px; margin-top: 10px;">前年比 +25% ↗</div>
</div>

<div style="background: linear-gradient(135deg, #ff6b6b, #ee5a52); color: white; padding: 30px; border-radius: 12px; text-align: center;">
<div style="font-size: 36px; font-weight: bold;">98.5%</div>
<div>顧客満足度</div>
<div style="font-size: 14px; margin-top: 10px;">目標達成 ✓</div>
</div>
---

## KPI ダッシュボード (2)

**KPI ダッシュボードの詳細内容を説明します**

<div style="background: linear-gradient(135deg, #f39800, #e67e22); color: white; padding: 30px; border-radius: 12px; text-align: center;">
<div style="font-size: 36px; font-weight: bold;">1,250</div>
<div>新規顧客数</div>
<div style="font-size: 14px; margin-top: 10px;">月次目標達成 ✓</div>
</div>

</div>
```

---
---

## ✅ Marp変換チェックリスト

**✅ Marp変換チェックリストに関する重要な情報を整理して説明します**


---

## **変換前チェック（ドラフト段階）**

****変換前チェック（ドラフト段階）**に関する重要な情報を整理して説明します**

- [ ] 各セクションが1つの明確なメッセージを持っているか
- [ ] 行数が24行以上のセクションがないか
- [ ] 概要文として使える文章が各セクションにあるか
- [ ] 視覚的要素（図表、画像）の配置が計画されているか
---

## **変換中チェック（Marp作成中）**

****変換中チェック（Marp作成中）**に関する重要な情報を整理して説明します**

- [ ] フロントマターが正しく設定されているか
- [ ] 1スライド1メッセージが守られているか
- [ ] タイトル下に概要文が配置されているか
- [ ] 適切なレイアウトバリエーションが選択されているか
- [ ] フォントサイズ・色彩・余白が適切か
---

## **変換後チェック（完成後）**

****変換後チェック（完成後）**に関する重要な情報を整理して説明します**

- [ ] 全スライドが読みやすいか
- [ ] 画像・図表が正しく表示されるか
- [ ] HTMLエクスポートが正常に動作するか
- [ ] PPTXエクスポートで問題がないか
- [ ] キーボードナビゲーションが機能するか

---
---

## 🏆 成功するMarp表現の秘訣

**🏆 成功するMarp表現の秘訣に関する重要な情報を整理して説明します**


---

## **心構え**

****心構え**に関する重要な情報を整理して説明します**

1. **読み手視点を最優先** → 自分がわかるより相手が理解できるか
2. **シンプルさを重視** → 複雑さより明確さ
3. **一貫性を保つ** → 全スライドで統一されたスタイル
4. **視覚的リズムを作る** → 単調さを避けるバリエーション
---

## **実践テクニック**

****実践テクニック**の構造と関係性について体系的に説明します**

1. **概要文で導入** → 聞き手の理解を助ける
2. **色で階層化** → 重要度を視覚的に表現
3. **余白で呼吸** → 情報過多を避ける
4. **繰り返しで強調** → 重要メッセージの反復
---

## **避けるべき落とし穴**

****避けるべき落とし穴**の構造と関係性について体系的に説明します**

1. **情報の詰め込みすぎ** → 1スライド1メッセージを厳守
2. **フォントサイズの不統一** → 一貫したサイズ設定
3. **色の使いすぎ** → 3-4色以内に制限
4. **アニメーションへの依存** → Marpではシンプルな表現を

---
---

## 🔧 よくある問題と解決策

**🔧 よくある問題と解決策に関する重要な情報を整理して説明します**


---

## **スタイル・レイアウト関連**

****スタイル・レイアウト関連**に関する重要な情報を整理して説明します**


---

## **問題1: フォントサイズが期待通りにならない**

****問題1: フォントサイズが期待通りにならない**に関する重要な情報を整理して説明します**

```markdown
❌ 問題のあるCSS
<style>
p { font-size: 24px; }  /* 具体性が低い */
</style>

✅ 解決策
<style scoped>
section p { font-size: 24px !important; }  /* 具体性を高める */
</style>
```
---

## **問題2: 画像が正しく表示されない**

****問題2: 画像が正しく表示されない**に関する重要な情報を整理して説明します**

```markdown
❌ 絶対パス（エラーの原因）
![](C:\Users\username\images\photo.jpg)

❌ ローカルフルパス（移植性なし）
![](/home/user/project/images/photo.jpg)

✅ 相対パス（推奨）
![](./images/photo.jpg)
![](../assets/photo.jpg)
```
---

## **問題3: レイアウトが崩れる**

****問題3: レイアウトが崩れる**の構造と関係性について体系的に説明します**

```markdown
❌ 高さ固定（画面サイズに依存）
<div style="height: 600px;">...</div>

✅ 相対的な高さ（柔軟な対応）
<div style="min-height: 60vh;">...</div>
<div style="height: auto; padding: 40px 0;">...</div>
```
---

## **エクスポート・表示関連**

****エクスポート・表示関連**に関する重要な情報を整理して説明します**


---

## **問題4: PPTX出力で日本語フォントが正しく表示されない**

****問題4: PPTX出力で日本語フォントが正しく表示されない**に関する重要な情報を整理して説明します**

```yaml
---

## marp.config.js または フロントマターで対応

**marp.config.js または フロントマターで対応に関する重要な情報を整理して説明します**

---
marp: true
theme: default
style: |
  section {
    font-family: "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif;
  }
---
```
---

## **問題5: HTML出力で画像が表示されない**

****問題5: HTML出力で画像が表示されない**に関する重要な情報を整理して説明します**

```bash
---

## 解決策：正しいオプションでビルド

**解決策：正しいオプションでビルドに関する重要な情報を整理して説明します**

marp presentation.md --html --allow-local-files --output index.html
---

## または相対パスの確認

**または相対パスの確認に関する重要な情報を整理して説明します**


---

## presentation.md と images/ フォルダが同じディレクトリにあることを確認

**presentation.md と images/ フォルダが同じディレクトリにあることを確認に関する重要な情報を整理して説明します**

```
---

## **パフォーマンス関連**

****パフォーマンス関連**に関する重要な情報を整理して説明します**


---

<!-- _class: split-layout -->
## **問題6: 大きなファイルサイズで重い**

****問題6: 大きなファイルサイズで重い**の重要な数値とデータを詳しく解説します**

```markdown
解決策：
1. 画像の最適化
   - JPEG: 品質80-90%に調整
   - PNG: 色数を制限
   - WebP形式の使用検討

2. CSSの最適化
   - 不要なスタイルの削除
   - インラインCSSの統合

3. スライド数の適切な分割
   - 100スライド以上は分割検討
   - セクション別ファイル作成
```
---

## **ブラウザ・環境対応**

****ブラウザ・環境対応**に関する重要な情報を整理して説明します**


---

<!-- _class: split-layout -->
## **問題7: ブラウザによって表示が異なる**

****問題7: ブラウザによって表示が異なる**に関する重要な情報を整理して説明します**

```css
/* 安全なCSSプロパティの使用 */
✅ 推奨
- display: flex, grid
- margin, padding
- background, color
- border-radius
- text-align

❌ 避けるべき
- position: sticky（サポート不安定）
- CSS Grid の複雑な機能
- 最新のCSS機能（backdrop-filter等）
```
---

<!-- _class: split-layout -->
## **問題8: プロジェクターで文字が小さい**

****問題8: プロジェクターで文字が小さい**に関する重要な情報を整理して説明します**

```markdown
対策：
1. 基本フォントサイズを22px以上に設定
2. プレゼンテーション前の表示確認
3. 重要情報のフォントサイズを大きく（28px以上）
4. コントラスト比の十分な確保

<!-- プロジェクター用スタイル例 -->
<style>
@media (max-width: 1024px) {
  section { font-size: 26px; }
  h2 { font-size: 32px; }
}
</style>
```
---

## **生産性向上のコツ**

****生産性向上のコツ**に関する重要な情報を整理して説明します**


---

## **テンプレート活用**

****テンプレート活用**に関する重要な情報を整理して説明します**

```markdown
---

## スライドテンプレートの作成

**スライドテンプレートの作成に関する重要な情報を整理して説明します**

---
marp: true
theme: default
class: 
  - lead
  - invert
style: |
  section { font-size: 22px; }
  .split-layout { /* よく使うレイアウト */ }
---

<!-- 標準スライドテンプレート -->
---

## [タイトル]

**[タイトル]に関する重要な情報を整理して説明します**

**[概要文]**
---

## [セクション1]

**[セクション1]に関する重要な情報を整理して説明します**

- [内容1]
- [内容2]
---

## [セクション2]

**[セクション2]に関する重要な情報を整理して説明します**

- [内容1]
- [内容2]
```
---

## **効率的なワークフロー**

****効率的なワークフロー**の全体像と主要なポイントを説明します**

### 概要

- ```markdown
1. アウトライン作成（マークダウン）
2. 構造の確認とスライド分割
3. レイアウト選択と適用
4. スタイル調整
5. 画像・図表の追加
6. プレビュー確認
7. エクスポート
8. 最終確認

各段階でのチェックポイント：
✓ 1スライド1メッセージ
✓ 適切なフォントサイズ
✓ 十分なコントラスト
✓ 読みやすい行間
✓ バランスの取れたレイアウト
```

---

**このガイドに従えば、効果的で美しく、伝わりやすいMarpプレゼンテーションを確実に作成できます
- ** 🎯

**さらに、よくある問題も事前に回避でき、スムーズな制作プロセスを実現できます

---

## **効率的なワークフロー**

****効率的なワークフロー**の詳細内容を説明します**

```markdown
1. アウトライン作成（マークダウン）
2. 構造の確認とスライド分割
3. レイアウト選択と適用
4. スタイル調整
5. 画像・図表の追加
6. プレビュー確認
7. エクスポート
8. 最終確認

各段階でのチェックポイント：
✓ 1スライド1メッセージ
✓ 適切なフォントサイズ
✓ 十分なコントラスト
✓ 読みやすい行間
✓ バランスの取れたレイアウト
```
---

## **効率的なワークフロー** (2)

****効率的なワークフロー**の詳細内容を説明します**

---

**このガイドに従えば、効果的で美しく、伝わりやすいMarpプレゼンテーションを確実に作成できます！** 🎯

**さらに、よくある問題も事前に回避でき、スムーズな制作プロセスを実現できます。** 🔧