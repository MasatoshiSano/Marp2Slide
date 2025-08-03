#!/usr/bin/env tsx

import { writeFileSync } from 'fs';
import { ProcessingPipeline } from './src/index.js';

console.log('🚀 Marp2Slide クイックスタート');
console.log('================================\n');

async function quickStart() {
  try {
    console.log('1️⃣  処理パイプラインを初期化中...');
    const pipeline = new ProcessingPipeline();
    
    console.log('2️⃣  5つのMarkdownファイルを処理中...');
    console.log('   📄 01_idea-approach-philosophy.md');
    console.log('   📄 02_draft-creation-philosophy.md');
    console.log('   📄 03_how-to-present-complete-guide.md');
    console.log('   📄 04_marp-expression-complete-guide.md');
    console.log('   📄 05_marp-to-html-guide.md\n');
    
    // 処理状況をモニタリング
    const processingPromise = pipeline.processFiles('./');
    
    // 進捗表示
    const progressInterval = setInterval(() => {
      const status = pipeline.getProcessingStatus();
      const stageNames = {
        1: 'アイデア分析',
        2: 'ドラフト構造',
        3: 'パターン選択',
        4: 'Marp生成',
        5: 'HTML変換'
      };
      
      console.log(`   ⏳ ${status.progress}% - ${stageNames[status.currentStage] || status.currentStage} (残り: ${status.estimatedTimeRemaining}秒)`);
      
      if (status.progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 2000);
    
    // 処理実行
    const htmlSlideshow = await processingPromise;
    clearInterval(progressInterval);
    
    console.log('\n3️⃣  処理完了！結果を出力中...');
    
    // 結果の生成
    const htmlOutput = pipeline.generateCompleteHTML();
    const marpOutput = pipeline.generateMarpMarkdown();
    const report = pipeline.generateProcessingReport();
    
    // ファイル出力
    writeFileSync('slideshow.html', htmlOutput);
    writeFileSync('slides.md', marpOutput);
    writeFileSync('processing-report.json', JSON.stringify(report, null, 2));
    
    console.log('\n✅ 成功！以下のファイルが生成されました:');
    console.log('   📊 slideshow.html     - インタラクティブHTMLスライド');
    console.log('   📝 slides.md          - Marpマークダウンファイル');
    console.log('   📋 processing-report.json - 処理レポート\n');
    
    console.log('📈 処理結果サマリー:');
    console.log(`   スライド数: ${report.summary.totalSlides}`);
    console.log(`   推定時間: ${report.summary.totalTime}分`);
    console.log(`   適用原則: ${report.summary.principlesApplied}個`);
    console.log(`   使用パターン: ${report.summary.patternsUsed}個`);
    console.log(`   品質スコア: ${report.summary.qualityScore}/100`);
    
    if (report.issues.errors.length > 0) {
      console.log(`\n⚠️  エラー: ${report.issues.errors.length}個`);
      report.issues.errors.forEach((error, i) => {
        console.log(`   ${i+1}. ${error.message}`);
      });
    }
    
    if (report.issues.warnings.length > 0) {
      console.log(`\n💡 警告: ${report.issues.warnings.length}個`);
      report.issues.warnings.slice(0, 3).forEach((warning, i) => {
        console.log(`   ${i+1}. ${warning.message}`);
      });
      if (report.issues.warnings.length > 3) {
        console.log(`   ... 他 ${report.issues.warnings.length - 3}個`);
      }
    }
    
    if (report.recommendations.length > 0) {
      console.log('\n💡 推奨事項:');
      report.recommendations.forEach((rec, i) => {
        console.log(`   ${i+1}. ${rec}`);
      });
    }
    
    console.log('\n🎉 完了！slideshow.htmlをブラウザで開いてスライドを確認してください。');
    console.log('   キーボード操作: ← → で移動、F でフルスクリーン、ESC で終了');
    
  } catch (error) {
    console.error('\n❌ エラーが発生しました:', error);
    
    if (error instanceof Error) {
      console.error('   詳細:', error.message);
    }
    
    console.log('\n🔧 解決方法:');
    console.log('   1. 5つのMarkdownファイル（01-05）が存在することを確認');
    console.log('   2. ファイルが空でないことを確認');
    console.log('   3. ファイルが正しい順序で命名されていることを確認');
    console.log('   4. npm install が完了していることを確認');
  }
}

// 実行
quickStart();