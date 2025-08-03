import { 
  MarkdownFile, 
  IdeaAnalysis, 
  Principle, 
  CriticalThinkingFramework, 
  EvaluationCriteria, 
  TechnicalAspect, 
  BusinessAspect, 
  UXAspect 
} from '../types/index.js';
import { ContentParser, ParsedContent } from './ContentParser.js';

export class IdeaAnalysisProcessor {
  private contentParser: ContentParser;

  constructor() {
    this.contentParser = new ContentParser();
  }

  async processIdeaAnalysis(file: MarkdownFile): Promise<IdeaAnalysis> {
    const parsedContent = this.contentParser.parseMarkdownFile(file);
    
    const principles = this.extractPrinciples(parsedContent);
    const criticalThinking = this.extractCriticalThinkingFramework(parsedContent);
    const evaluationCriteria = this.extractEvaluationCriteria(parsedContent);

    return {
      principles,
      criticalThinking,
      evaluationCriteria
    };
  }

  private extractPrinciples(parsedContent: ParsedContent): Principle[] {
    const principles: Principle[] = [];
    
    // Find the basic approach section
    const basicApproachSection = parsedContent.sections.find(
      section => section.title.includes('基本姿勢') || section.title.includes('基本')
    );

    if (basicApproachSection) {
      const content = basicApproachSection.content;
      
      // Extract efficiency principles
      if (content.includes('効率性') || content.includes('実用性')) {
        principles.push({
          name: '効率性と実用性の重視',
          description: 'アイデアは実装可能で、実際の問題解決に繋がるものを優先し、技術的な実現可能性と投資対効果を常に考慮する',
          category: 'efficiency',
          importance: 9
        });
      }

      // Extract critical thinking principles
      if (content.includes('批判的思考') || content.includes('批判')) {
        principles.push({
          name: '批判的思考の適用',
          description: 'アイデアに対して建設的な批判と改善提案を行い、潜在的な問題点や制約を事前に特定する',
          category: 'critical-thinking',
          importance: 8
        });
      }

      // Extract structured approach principles
      if (content.includes('構造化') || content.includes('ワークフロー')) {
        principles.push({
          name: '構造化されたアプローチ',
          description: '仕様駆動開発の4段階ワークフローを活用し、アイデアを具体的な実装可能な要素に分解する',
          category: 'structured-approach',
          importance: 9
        });
      }
    }

    // Find additional principles from other sections
    parsedContent.sections.forEach(section => {
      if (section.title.includes('改善') || section.title.includes('イテレーション')) {
        principles.push({
          name: '継続的改善',
          description: 'フィードバックを基にした反復的な改善と、実装後の検証と調整を重視する',
          category: 'structured-approach',
          importance: 7
        });
      }

      if (section.title.includes('コミュニケーション')) {
        principles.push({
          name: '協働的コミュニケーション',
          description: 'チームメンバーとの積極的な議論と、ステークホルダーに応じた適切なレベルの説明を行う',
          category: 'structured-approach',
          importance: 6
        });
      }
    });

    return principles;
  }

  private extractCriticalThinkingFramework(parsedContent: ParsedContent): CriticalThinkingFramework {
    const technicalAspects: TechnicalAspect[] = [];
    const businessAspects: BusinessAspect[] = [];
    const userExperienceAspects: UXAspect[] = [];

    // Find the evaluation criteria section
    const evaluationSection = parsedContent.sections.find(
      section => section.title.includes('評価') || section.title.includes('観点')
    );

    if (evaluationSection) {
      const content = evaluationSection.content;

      // Extract technical aspects
      if (content.includes('技術的側面') || content.includes('技術')) {
        technicalAspects.push({
          name: '実現可能性評価',
          feasibility: 9,
          scalability: 8,
          maintainability: 8,
          performance: 7
        });
      }

      // Extract business aspects
      if (content.includes('ビジネス的側面') || content.includes('ビジネス')) {
        businessAspects.push({
          name: 'ビジネス価値評価',
          valueProposition: 'ユーザーや組織にとっての明確な価値提供',
          differentiation: '既存のソリューションとの差別化',
          implementationCost: 7,
          risk: 6
        });
      }

      // Extract UX aspects
      if (content.includes('ユーザー体験') || content.includes('UX')) {
        userExperienceAspects.push({
          name: 'ユーザー体験評価',
          usability: 9,
          accessibility: 8,
          reliability: 9
        });
      }
    }

    return {
      technicalAspects,
      businessAspects,
      userExperienceAspects
    };
  }

  private extractEvaluationCriteria(parsedContent: ParsedContent): EvaluationCriteria {
    const technical: string[] = [];
    const business: string[] = [];
    const userExperience: string[] = [];

    // Look through all sections for evaluation criteria
    parsedContent.sections.forEach(section => {
      const content = section.content.toLowerCase();

      // Extract technical criteria
      if (content.includes('実現可能性')) technical.push('実現可能性');
      if (content.includes('拡張性')) technical.push('拡張性');
      if (content.includes('保守性')) technical.push('保守性');
      if (content.includes('パフォーマンス')) technical.push('パフォーマンス');
      if (content.includes('技術スタック')) technical.push('技術スタック適合性');
      if (content.includes('セキュリティ')) technical.push('セキュリティ');

      // Extract business criteria
      if (content.includes('価値提供')) business.push('価値提供');
      if (content.includes('差別化')) business.push('差別化');
      if (content.includes('実装コスト') || content.includes('コスト')) business.push('実装コスト');
      if (content.includes('リスク')) business.push('リスク管理');
      if (content.includes('roi') || content.includes('投資対効果')) business.push('投資対効果');
      if (content.includes('市場')) business.push('市場適合性');

      // Extract UX criteria
      if (content.includes('使いやすさ') || content.includes('ユーザビリティ')) userExperience.push('使いやすさ');
      if (content.includes('アクセシビリティ')) userExperience.push('アクセシビリティ');
      if (content.includes('信頼性')) userExperience.push('信頼性');
      if (content.includes('学習コスト')) userExperience.push('学習コスト');
      if (content.includes('直感的')) userExperience.push('直感性');
    });

    // Remove duplicates
    return {
      technical: Array.from(new Set(technical)),
      business: Array.from(new Set(business)),
      userExperience: Array.from(new Set(userExperience))
    };
  }

  // Apply the extracted framework to evaluate a new idea
  evaluateIdea(idea: string, framework: IdeaAnalysis): IdeaEvaluationResult {
    const scores = {
      technical: this.evaluateTechnicalAspects(idea, framework.criticalThinking.technicalAspects),
      business: this.evaluateBusinessAspects(idea, framework.criticalThinking.businessAspects),
      userExperience: this.evaluateUXAspects(idea, framework.criticalThinking.userExperienceAspects)
    };

    const overallScore = (scores.technical + scores.business + scores.userExperience) / 3;
    
    const recommendations = this.generateRecommendations(idea, framework, scores);
    const risks = this.identifyRisks(idea, framework);

    return {
      idea,
      scores,
      overallScore,
      recommendations,
      risks,
      framework
    };
  }

  private evaluateTechnicalAspects(idea: string, technicalAspects: TechnicalAspect[]): number {
    // Simple scoring based on keyword analysis
    const ideaLower = idea.toLowerCase();
    let score = 5; // Base score

    if (ideaLower.includes('api') || ideaLower.includes('システム')) score += 1;
    if (ideaLower.includes('データベース') || ideaLower.includes('db')) score += 1;
    if (ideaLower.includes('クラウド') || ideaLower.includes('aws')) score += 1;
    if (ideaLower.includes('セキュリティ')) score += 1;
    if (ideaLower.includes('パフォーマンス')) score += 1;
    if (ideaLower.includes('拡張') || ideaLower.includes('スケール')) score += 1;

    return Math.min(score, 10);
  }

  private evaluateBusinessAspects(idea: string, businessAspects: BusinessAspect[]): number {
    const ideaLower = idea.toLowerCase();
    let score = 5; // Base score

    if (ideaLower.includes('コスト削減') || ideaLower.includes('効率')) score += 2;
    if (ideaLower.includes('ユーザー') || ideaLower.includes('顧客')) score += 1;
    if (ideaLower.includes('自動化')) score += 2;
    if (ideaLower.includes('売上') || ideaLower.includes('利益')) score += 1;
    if (ideaLower.includes('競争優位')) score += 1;

    return Math.min(score, 10);
  }

  private evaluateUXAspects(idea: string, uxAspects: UXAspect[]): number {
    const ideaLower = idea.toLowerCase();
    let score = 5; // Base score

    if (ideaLower.includes('ui') || ideaLower.includes('ux')) score += 2;
    if (ideaLower.includes('使いやすい') || ideaLower.includes('簡単')) score += 2;
    if (ideaLower.includes('直感的')) score += 1;
    if (ideaLower.includes('アクセシブル') || ideaLower.includes('バリアフリー')) score += 1;
    if (ideaLower.includes('レスポンシブ')) score += 1;

    return Math.min(score, 10);
  }

  private generateRecommendations(idea: string, framework: IdeaAnalysis, scores: any): string[] {
    const recommendations: string[] = [];

    if (scores.technical < 7) {
      recommendations.push('技術的実現可能性をより詳細に検討することを推奨します');
    }

    if (scores.business < 7) {
      recommendations.push('ビジネス価値と投資対効果をより明確にすることを推奨します');
    }

    if (scores.userExperience < 7) {
      recommendations.push('ユーザー体験の改善とアクセシビリティの検討を推奨します');
    }

    // Apply principles-based recommendations
    framework.principles.forEach(principle => {
      if (principle.category === 'efficiency' && scores.technical < 8) {
        recommendations.push('効率性の観点から、よりシンプルなアプローチを検討してください');
      }
      if (principle.category === 'critical-thinking') {
        recommendations.push('潜在的な問題点と制約を事前に洗い出すことを推奨します');
      }
    });

    return recommendations;
  }

  private identifyRisks(idea: string, framework: IdeaAnalysis): string[] {
    const risks: string[] = [];
    const ideaLower = idea.toLowerCase();

    // Technical risks
    if (ideaLower.includes('新技術') || ideaLower.includes('実験的')) {
      risks.push('新技術採用に伴う技術的リスク');
    }
    if (ideaLower.includes('複雑') || ideaLower.includes('大規模')) {
      risks.push('システム複雑性による保守性リスク');
    }

    // Business risks
    if (ideaLower.includes('コスト') && !ideaLower.includes('削減')) {
      risks.push('開発・運用コストの増大リスク');
    }
    if (ideaLower.includes('競合')) {
      risks.push('競合他社の先行開発リスク');
    }

    // UX risks
    if (ideaLower.includes('学習') && ideaLower.includes('コスト')) {
      risks.push('ユーザーの学習コスト増大リスク');
    }
    if (ideaLower.includes('変更') || ideaLower.includes('移行')) {
      risks.push('既存ユーザーの移行リスク');
    }

    return risks;
  }

  // Generate a structured report of the idea analysis
  generateAnalysisReport(evaluation: IdeaEvaluationResult): string {
    let report = `# アイデア分析レポート\n\n`;
    report += `## 対象アイデア\n${evaluation.idea}\n\n`;
    
    report += `## 評価スコア\n`;
    report += `- 技術的側面: ${evaluation.scores.technical}/10\n`;
    report += `- ビジネス的側面: ${evaluation.scores.business}/10\n`;
    report += `- ユーザー体験: ${evaluation.scores.userExperience}/10\n`;
    report += `- **総合スコア: ${evaluation.overallScore.toFixed(1)}/10**\n\n`;

    if (evaluation.recommendations.length > 0) {
      report += `## 推奨事項\n`;
      evaluation.recommendations.forEach(rec => {
        report += `- ${rec}\n`;
      });
      report += `\n`;
    }

    if (evaluation.risks.length > 0) {
      report += `## 特定されたリスク\n`;
      evaluation.risks.forEach(risk => {
        report += `- ${risk}\n`;
      });
      report += `\n`;
    }

    report += `## 適用フレームワーク\n`;
    report += `以下の原則に基づいて評価を実施しました：\n`;
    evaluation.framework.principles.forEach(principle => {
      report += `- **${principle.name}**: ${principle.description}\n`;
    });

    return report;
  }
}

export interface IdeaEvaluationResult {
  idea: string;
  scores: {
    technical: number;
    business: number;
    userExperience: number;
  };
  overallScore: number;
  recommendations: string[];
  risks: string[];
  framework: IdeaAnalysis;
}