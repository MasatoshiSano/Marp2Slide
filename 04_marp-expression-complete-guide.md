# Marpで表現するための完全ガイド

> **ドラフトからMarpへの変換で絶対に注意すべきこと**

## 📖 このガイドについて

**用途**: Markdownドキュメントを効果的なMarpスライドに変換するための設計・実装ガイド

**対象出力**: 
- Marp → PDF/PPTX (プレゼンテーション用)
- Marp → HTML (基本的なWeb表示)

**関連ガイド**: 
- HTML出力の詳細な実装 → `marp-to-html-guide.md`
- コンテンツ駆動型レイアウト → `content-driven-layout-guide.md`

## 🎯 Marp表現の5つの黄金ルール

### 1. **1スライド1メッセージの徹底**
### 2. **タイトル下の概要文配置**
### 3. **レイアウトバリエーションで単調さ回避**
### 4. **視認性・可読性の最優先**
### 5. **Marp制約の理解と回避**

---

## 📋 Marp変換時の重要注意事項（15項目）

### **A. 構造・分割関連（4項目）**

#### **1. 適切なスライド分割**
```markdown
❌ 悪い例：情報過多
## セクション1
- 内容1（詳細説明が3行）
- 内容2（詳細説明が3行）
- 内容3（詳細説明が3行）
- 内容4（詳細説明が3行）
- 内容5（詳細説明が3行）

✅ 良い例：適切な分割
## セクション1：概要
**このスライドでは、5つの主要要素の全体像を示します。**
- 内容1
- 内容2
- 内容3
- 内容4
- 内容5

---

## セクション1-1：詳細解説
**内容1と2について、具体例とデータで詳しく説明します。**

### 内容1の詳細
（詳細説明）

### 内容2の詳細
（詳細説明）
```

#### **2. 論理的な情報階層**
```markdown
# メインタイトル（h1）
## スライドタイトル（h2）
**概要文（太字）**
### セクション見出し（h3）
#### 詳細項目（h4）
- 箇条書き項目
  - サブ項目
```

#### **3. スライド間の連続性確保**
```markdown
## 前スライドの振り返り + 今回の内容
**前回：基本概念を確認 → 今回：実践的応用方法を解説**

## 今回の内容 + 次回の予告
**今回：設計手法 → 次回：実装テクニック**
```

#### **4. セクション間のナビゲーション**
```markdown
<!-- パンくずリスト -->
## 第2章：設計手法 > 2-1：基本設計
**基本設計の3つのステップを順番に説明します。**

<!-- 進捗表示 -->
## プロジェクト計画（3/5）
**今回は実装フェーズの詳細スケジュールを確認します。**
```

### **B. 視認性・可読性関連（5項目）**

#### **5. フォントサイズの適切な設定**
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

**使い分けガイド：**
- **固定サイズ**: Marp → PDF/PPTX出力時
- **レスポンシブサイズ**: Marp → HTML出力時

#### **6. 色彩設計とコントラスト**
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

#### **7. 余白とレイアウト調整**
```markdown
<!-- 適切な余白設定 -->
<!-- _style: "padding: 40px 60px;" -->
## 余白たっぷりスライド

<!-- 内容が多い場合の調整 -->
<!-- _style: "padding: 40px 60px 45px 60px; font-size: 20px; line-height: 1.4;" -->
## 情報密度の高いスライド

<!-- 中央揃えレイアウト -->
<!-- _style: "text-align: center; padding: 60px 40px;" -->
## 中央配置スライド
```

#### **8. 行数制限と調整ルール**
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

#### **9. 画像・メディア最適化**
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

### **C. Marp特有の制約と対策（3項目）**

#### **10. HTMLタグとCSS制限への対策**
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

#### **11. ブラウザ・デバイス互換性**
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

#### **12. エクスポート時の注意点**
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

### **D. ユーザビリティ・アクセシビリティ（3項目）**

#### **13. キーボードナビゲーション**
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

#### **14. アクセシビリティ対応**
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

#### **15. プレゼンテーション実行時の配慮**
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

## 🎨 レイアウトバリエーション完全版

> **HTML実装方法**: これらのレイアウトをHTMLで実装する方法については `marp-to-html-guide.md` を参照してください。ここではMarpでの記述方法を解説します。

### **基本レイアウト（8パターン）**

#### **1. 標準レイアウト**
```markdown
## スライドタイトル
**概要文をここに配置**

### セクション1
- 内容1
- 内容2

### セクション2
- 内容1
- 内容2
```

#### **2. 左右分割レイアウト**
```markdown
<!-- _class: split-layout -->
## 比較・対比スライド

**2つの手法を並べて比較し、それぞれの特徴を明確にします。**

<div class="content-container">
<div class="split-left">

### 手法A
- 特徴1
- 特徴2
- 特徴3

</div>
<div class="split-right">

### 手法B
- 特徴1
- 特徴2
- 特徴3

</div>
</div>
```

#### **3. 中央集中レイアウト**
```markdown
<!-- _style: "text-align: center; padding: 80px 40px;" -->
## 重要メッセージ

**このスライドで最も重要なポイントを強調表示します。**

<div style="font-size: 48px; color: #ff6b6b; margin: 40px 0;">
核心メッセージ
</div>

詳細説明をここに記載
```

#### **4. 画像背景レイアウト**
```markdown
![bg brightness:0.6](background.jpg)

<!-- _style: "color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);" -->
## 画像背景スライド

**背景画像を効果的に活用したレイアウトの例です。**

### 主要ポイント
- ポイント1
- ポイント2
- ポイント3

<!-- _footer: "画像出典：Unsplash" -->
```

#### **5. グリッドレイアウト**
```markdown
## 4つの要素

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

#### **6. 表組みレイアウト**
```markdown
## データ比較表

**3つのプランの特徴を表形式で比較します。**

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

#### **7. フローチャート型**
```markdown
## 意思決定フロー

**プロジェクト開始までの意思決定プロセスを図示します。**

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

#### **8. アコーディオン風レイアウト**
```markdown
## FAQ セクション

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

### **特殊レイアウト（3パターン）**

#### **9. タイムライン型**
```markdown
## プロジェクト進行

**3段階のプロジェクト進行を時系列で示します。**

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

#### **10. カード型**
```markdown
## サービス紹介

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

#### **11. ダッシュボード型**
```markdown
## KPI ダッシュボード

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

<div style="background: linear-gradient(135deg, #f39800, #e67e22); color: white; padding: 30px; border-radius: 12px; text-align: center;">
<div style="font-size: 36px; font-weight: bold;">1,250</div>
<div>新規顧客数</div>
<div style="font-size: 14px; margin-top: 10px;">月次目標達成 ✓</div>
</div>

</div>
```

---

## ✅ Marp変換チェックリスト

### **変換前チェック（ドラフト段階）**
- [ ] 各セクションが1つの明確なメッセージを持っているか
- [ ] 行数が24行以上のセクションがないか
- [ ] 概要文として使える文章が各セクションにあるか
- [ ] 視覚的要素（図表、画像）の配置が計画されているか

### **変換中チェック（Marp作成中）**
- [ ] フロントマターが正しく設定されているか
- [ ] 1スライド1メッセージが守られているか
- [ ] タイトル下に概要文が配置されているか
- [ ] 適切なレイアウトバリエーションが選択されているか
- [ ] フォントサイズ・色彩・余白が適切か

### **変換後チェック（完成後）**
- [ ] 全スライドが読みやすいか
- [ ] 画像・図表が正しく表示されるか
- [ ] HTMLエクスポートが正常に動作するか
- [ ] PPTXエクスポートで問題がないか
- [ ] キーボードナビゲーションが機能するか

---

## 🏆 成功するMarp表現の秘訣

### **心構え**
1. **読み手視点を最優先** → 自分がわかるより相手が理解できるか
2. **シンプルさを重視** → 複雑さより明確さ
3. **一貫性を保つ** → 全スライドで統一されたスタイル
4. **視覚的リズムを作る** → 単調さを避けるバリエーション

### **実践テクニック**
1. **概要文で導入** → 聞き手の理解を助ける
2. **色で階層化** → 重要度を視覚的に表現
3. **余白で呼吸** → 情報過多を避ける
4. **繰り返しで強調** → 重要メッセージの反復

### **避けるべき落とし穴**
1. **情報の詰め込みすぎ** → 1スライド1メッセージを厳守
2. **フォントサイズの不統一** → 一貫したサイズ設定
3. **色の使いすぎ** → 3-4色以内に制限
4. **アニメーションへの依存** → Marpではシンプルな表現を

---

## 🔧 よくある問題と解決策

### **スタイル・レイアウト関連**

#### **問題1: フォントサイズが期待通りにならない**
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

#### **問題2: 画像が正しく表示されない**
```markdown
❌ 絶対パス（エラーの原因）
![](C:\Users\username\images\photo.jpg)

❌ ローカルフルパス（移植性なし）
![](/home/user/project/images/photo.jpg)

✅ 相対パス（推奨）
![](./images/photo.jpg)
![](../assets/photo.jpg)
```

#### **問題3: レイアウトが崩れる**
```markdown
❌ 高さ固定（画面サイズに依存）
<div style="height: 600px;">...</div>

✅ 相対的な高さ（柔軟な対応）
<div style="min-height: 60vh;">...</div>
<div style="height: auto; padding: 40px 0;">...</div>
```

### **エクスポート・表示関連**

#### **問題4: PPTX出力で日本語フォントが正しく表示されない**
```yaml
# marp.config.js または フロントマターで対応
---
marp: true
theme: default
style: |
  section {
    font-family: "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif;
  }
---
```

#### **問題5: HTML出力で画像が表示されない**
```bash
# 解決策：正しいオプションでビルド
marp presentation.md --html --allow-local-files --output index.html

# または相対パスの確認
# presentation.md と images/ フォルダが同じディレクトリにあることを確認
```

### **パフォーマンス関連**

#### **問題6: 大きなファイルサイズで重い**
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

### **ブラウザ・環境対応**

#### **問題7: ブラウザによって表示が異なる**
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

#### **問題8: プロジェクターで文字が小さい**
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

### **生産性向上のコツ**

#### **テンプレート活用**
```markdown
# スライドテンプレートの作成
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
## [タイトル]

**[概要文]**

### [セクション1]
- [内容1]
- [内容2]

### [セクション2]
- [内容1]
- [内容2]
```

#### **効率的なワークフロー**
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

**このガイドに従えば、効果的で美しく、伝わりやすいMarpプレゼンテーションを確実に作成できます！** 🎯

**さらに、よくある問題も事前に回避でき、スムーズな制作プロセスを実現できます。** 🔧