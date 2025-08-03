// Configuration for the 25 presentation patterns from the guide

import { PresentationPattern, ContentType } from '../types/index.js';

export const presentationPatterns: PresentationPattern[] = [
  // A. 数値・データ系（6パターン）
  {
    id: 'number-emphasis',
    name: '数字の強調',
    category: ContentType.NUMERICAL_DATA,
    description: '売上・達成率などを強く印象付けたい',
    useCases: ['売上実績', '達成率', 'KPI表示', '重要な数値'],
    marpImplementation: `<div style="font-size: 72px; color: #ff6b6b; font-weight: bold; margin: 50px 0;">150億円</div>`,
    effectiveness: 9,
  },
  {
    id: 'comparison',
    name: '比較（対比）',
    category: ContentType.NUMERICAL_DATA,
    description: 'A/B、前年比、競合比較など',
    useCases: ['A/B比較', '前年比', '競合分析', 'Before/After'],
    marpImplementation: `<!-- _class: split-layout -->`,
    effectiveness: 8,
  },
  {
    id: 'chart-graph',
    name: 'グラフ・チャート',
    category: ContentType.NUMERICAL_DATA,
    description: '数値変化・比率・推移を伝えたいとき',
    useCases: ['売上推移', '市場シェア', '成長率', 'データ分析'],
    marpImplementation: `![w:600](chart.png)`,
    effectiveness: 8,
  },
  {
    id: 'dashboard',
    name: 'ダッシュボード風',
    category: ContentType.NUMERICAL_DATA,
    description: '複数の重要指標を一覧表示',
    useCases: ['KPIダッシュボード', '業績サマリー', '指標一覧'],
    marpImplementation: `<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">`,
    effectiveness: 7,
  },
  {
    id: 'progress-bar',
    name: '進捗バー',
    category: ContentType.NUMERICAL_DATA,
    description: '達成度や進行状況を表現',
    useCases: ['プロジェクト進捗', '目標達成度', '完了率'],
    marpImplementation: `<div class="progress-bar"><div class="progress-fill" style="width: 75%;"></div></div>`,
    effectiveness: 6,
  },
  {
    id: 'ranking',
    name: 'ランキング表示',
    category: ContentType.NUMERICAL_DATA,
    description: '順位や重要度を示したいとき',
    useCases: ['売上ランキング', '人気商品', '優先順位'],
    marpImplementation: `<ol class="ranking-list">`,
    effectiveness: 7,
  },

  // B. 構造・関係性系（6パターン）
  {
    id: 'diagram-structure',
    name: '図解（構造・関係）',
    category: ContentType.STRUCTURAL_RELATIONSHIP,
    description: '全体像や関係性を説明したいとき',
    useCases: ['システム構成', '組織図', '関係性説明'],
    marpImplementation: `<!-- Mermaid図 + 説明 -->`,
    effectiveness: 9,
  },
  {
    id: 'pyramid',
    name: 'ピラミッド構造',
    category: ContentType.STRUCTURAL_RELATIONSHIP,
    description: '階層や重要度を表現',
    useCases: ['優先順位', '階層構造', 'マズローの欲求'],
    marpImplementation: `<div class="pyramid">`,
    effectiveness: 8,
  },
  {
    id: 'matrix',
    name: 'マトリクス（2軸図）',
    category: ContentType.STRUCTURAL_RELATIONSHIP,
    description: '優先度や分類を整理したいとき',
    useCases: ['重要度×緊急度', 'ポートフォリオ分析', '4象限分析'],
    marpImplementation: `<div class="matrix-2x2">`,
    effectiveness: 8,
  },
  {
    id: 'network',
    name: 'ネットワーク図',
    category: ContentType.STRUCTURAL_RELATIONSHIP,
    description: '相互関係や影響を示す',
    useCases: ['ネットワーク構成', '人間関係', '影響関係'],
    marpImplementation: `<!-- ノード + エッジの図解 -->`,
    effectiveness: 7,
  },
  {
    id: 'org-tree',
    name: '組織図・ツリー',
    category: ContentType.STRUCTURAL_RELATIONSHIP,
    description: '階層構造や分類を表現',
    useCases: ['組織構造', '分類体系', '決定木'],
    marpImplementation: `<div class="tree-structure">`,
    effectiveness: 7,
  },
  {
    id: 'flow-process',
    name: 'フロー・プロセス図',
    category: ContentType.STRUCTURAL_RELATIONSHIP,
    description: '業務フローや判断過程',
    useCases: ['業務フロー', '判断プロセス', '手順説明'],
    marpImplementation: `<div class="process-flow">`,
    effectiveness: 8,
  },

  // C. 時系列・フロー系（4パターン）
  {
    id: 'steps',
    name: 'ステップ（手順・流れ）',
    category: ContentType.TEMPORAL_FLOW,
    description: 'フロー説明、計画の段階を伝えるとき',
    useCases: ['手順説明', 'プロセス', '段階的計画'],
    marpImplementation: `<div class="step-flow">`,
    effectiveness: 9,
  },
  {
    id: 'timeline',
    name: 'タイムライン（時系列）',
    category: ContentType.TEMPORAL_FLOW,
    description: '過去〜現在〜未来の説明',
    useCases: ['プロジェクト履歴', '発展過程', 'ロードマップ'],
    marpImplementation: `<div class="timeline">`,
    effectiveness: 8,
  },
  {
    id: 'cause-effect',
    name: '因果関係（フロー）',
    category: ContentType.TEMPORAL_FLOW,
    description: '原因→結果の論理を示したいとき',
    useCases: ['問題分析', '影響関係', '論理展開'],
    marpImplementation: `<div class="cause-effect-flow">`,
    effectiveness: 8,
  },
  {
    id: 'roadmap',
    name: 'ロードマップ',
    category: ContentType.TEMPORAL_FLOW,
    description: '長期計画や戦略的方向性',
    useCases: ['戦略計画', '製品ロードマップ', '長期ビジョン'],
    marpImplementation: `<div class="roadmap">`,
    effectiveness: 8,
  },

  // D. 情報整理・構成系（6パターン）
  {
    id: 'bullet-list',
    name: '箇条書き（バレット）',
    category: ContentType.INFORMATION_ORGANIZATION,
    description: '要点を並べたいとき',
    useCases: ['要点整理', 'チェックリスト', '項目列挙'],
    marpImplementation: `- ポイント1\n- ポイント2`,
    effectiveness: 6,
  },
  {
    id: 'icon-text',
    name: 'アイコン＋短文',
    category: ContentType.INFORMATION_ORGANIZATION,
    description: '概念や要素を分かりやすく伝えたいとき',
    useCases: ['特徴説明', 'サービス紹介', '機能一覧'],
    marpImplementation: `<div class="icon-text-grid">`,
    effectiveness: 8,
  },
  {
    id: 'card-tile',
    name: 'カード・タイル型',
    category: ContentType.INFORMATION_ORGANIZATION,
    description: '複数の要素を整理して表示',
    useCases: ['商品紹介', 'サービス一覧', '機能比較'],
    marpImplementation: `<div class="card-grid">`,
    effectiveness: 8,
  },
  {
    id: 'checklist',
    name: 'チェックリスト',
    category: ContentType.INFORMATION_ORGANIZATION,
    description: '確認事項や要件を示す',
    useCases: ['確認項目', '要件一覧', 'タスクリスト'],
    marpImplementation: `- [ ] 項目1\n- [x] 項目2`,
    effectiveness: 7,
  },
  {
    id: 'faq',
    name: 'FAQ形式',
    category: ContentType.INFORMATION_ORGANIZATION,
    description: 'よくある質問や疑問に答える',
    useCases: ['Q&A', '疑問解決', 'トラブルシューティング'],
    marpImplementation: `<details><summary>Q: 質問</summary>A: 回答</details>`,
    effectiveness: 7,
  },
  {
    id: 'table',
    name: 'テーブル・一覧表',
    category: ContentType.INFORMATION_ORGANIZATION,
    description: '複数項目の比較や整理',
    useCases: ['機能比較', '価格表', 'スペック一覧'],
    marpImplementation: `| 項目 | 値1 | 値2 |\n|------|-----|-----|`,
    effectiveness: 7,
  },

  // E. 感情・体験系（3パターン）
  {
    id: 'photo-visual',
    name: '写真・ビジュアル',
    category: ContentType.EMOTIONAL_EXPERIENTIAL,
    description: '実物や雰囲気を伝えたいとき',
    useCases: ['商品紹介', '事例紹介', '雰囲気演出'],
    marpImplementation: `![bg](image.jpg)`,
    effectiveness: 9,
  },
  {
    id: 'storytelling',
    name: 'ストーリーテリング構成',
    category: ContentType.EMOTIONAL_EXPERIENTIAL,
    description: '成功事例やプロジェクトの流れ',
    useCases: ['事例紹介', '体験談', 'プロジェクト紹介'],
    marpImplementation: `<!-- 起承転結構成 -->`,
    effectiveness: 9,
  },
  {
    id: 'quote-testimonial',
    name: '引用・証言',
    category: ContentType.EMOTIONAL_EXPERIENTIAL,
    description: '権威性や信頼性を示したい',
    useCases: ['お客様の声', '専門家コメント', '実績紹介'],
    marpImplementation: `> "引用文"\n> — 出典`,
    effectiveness: 8,
  },
];

// Pattern selection algorithm weights
export const patternSelectionWeights = {
  contentTypeMatch: 0.4,
  effectiveness: 0.3,
  useCaseRelevance: 0.2,
  implementationComplexity: 0.1,
};

// Content analysis keywords for pattern selection
export const contentAnalysisKeywords = {
  [ContentType.NUMERICAL_DATA]: [
    '数値', '売上', '利益', '達成率', 'KPI', '指標', '統計', 'データ',
    '比較', '前年比', '成長率', '割合', 'パーセント', '金額', '件数'
  ],
  [ContentType.STRUCTURAL_RELATIONSHIP]: [
    '構造', '関係', '組織', 'システム', '階層', '分類', '体系',
    '相互', '影響', 'ネットワーク', '接続', '依存', '関連性'
  ],
  [ContentType.TEMPORAL_FLOW]: [
    '手順', 'ステップ', 'プロセス', '流れ', '順序', '段階',
    '時系列', 'タイムライン', '履歴', '経過', '推移', 'ロードマップ'
  ],
  [ContentType.INFORMATION_ORGANIZATION]: [
    '一覧', 'リスト', '項目', '要点', '整理', '分類', '比較',
    'チェック', '確認', '要件', 'FAQ', '質問', '回答'
  ],
  [ContentType.EMOTIONAL_EXPERIENTIAL]: [
    '事例', '体験', 'ストーリー', '物語', '感情', '印象',
    '写真', '画像', '証言', '引用', 'お客様', '実績'
  ],
};

// Pattern compatibility matrix
export const patternCompatibility: Record<string, string[]> = {
  'number-emphasis': ['comparison', 'dashboard', 'progress-bar'],
  'comparison': ['number-emphasis', 'table', 'chart-graph'],
  'chart-graph': ['comparison', 'dashboard', 'timeline'],
  'dashboard': ['number-emphasis', 'chart-graph', 'progress-bar'],
  'steps': ['timeline', 'flow-process', 'checklist'],
  'timeline': ['steps', 'roadmap', 'storytelling'],
  'diagram-structure': ['matrix', 'network', 'org-tree'],
  'matrix': ['diagram-structure', 'comparison', 'dashboard'],
  'card-tile': ['icon-text', 'table', 'dashboard'],
  'icon-text': ['card-tile', 'bullet-list', 'checklist'],
  'photo-visual': ['storytelling', 'quote-testimonial'],
  'storytelling': ['photo-visual', 'timeline', 'quote-testimonial'],
};

// Fallback patterns for each content type
export const fallbackPatterns: Record<ContentType, string[]> = {
  [ContentType.NUMERICAL_DATA]: ['number-emphasis', 'table', 'bullet-list'],
  [ContentType.STRUCTURAL_RELATIONSHIP]: ['diagram-structure', 'bullet-list', 'table'],
  [ContentType.TEMPORAL_FLOW]: ['steps', 'bullet-list', 'table'],
  [ContentType.INFORMATION_ORGANIZATION]: ['bullet-list', 'table', 'card-tile'],
  [ContentType.EMOTIONAL_EXPERIENTIAL]: ['photo-visual', 'bullet-list', 'quote-testimonial'],
};

// Pattern selection utility functions
export function getPatternById(id: string): PresentationPattern | undefined {
  return presentationPatterns.find(pattern => pattern.id === id);
}

export function getPatternsByCategory(category: ContentType): PresentationPattern[] {
  return presentationPatterns.filter(pattern => pattern.category === category);
}

export function getCompatiblePatterns(patternId: string): PresentationPattern[] {
  const compatibleIds = patternCompatibility[patternId] || [];
  return compatibleIds.map(id => getPatternById(id)).filter(Boolean) as PresentationPattern[];
}

export function getFallbackPatterns(contentType: ContentType): PresentationPattern[] {
  const fallbackIds = fallbackPatterns[contentType] || [];
  return fallbackIds.map(id => getPatternById(id)).filter(Boolean) as PresentationPattern[];
}