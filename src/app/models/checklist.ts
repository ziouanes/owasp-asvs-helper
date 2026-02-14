// src/app/models/checklist.ts

import { Summary } from './summary';
import { Category } from './category';
import { Requirement } from './requirement';
import { ValidStatus } from './valid-status';

export class Checklist {
  summary: Summary[];
  categories: Category[];

  constructor(data: any) {
    this.summary = [];
    this.categories = [];

    if (data['ASVS Results']) {
      for (let summaryData of data['ASVS Results']) {
        this.summary.push(new Summary(summaryData));
      }
    }

    const categoryNames = [
      'Architecture', 'Authentication', 'Session Management', 'Access Control',
      'Input Validation', 'Cryptography at Rest', 'Error Handling and Logging',
      'Data Protection', 'Communication Security', 'Malicious Code',
      'Business Logic', 'Files and Resources', 'API and Web Service', 'Configuration'
    ];

    for (let categoryName of categoryNames) {
      if (data[categoryName]) {
        this.categories.push(new Category(categoryName, data[categoryName]));
      }
    }

    this.updateSummary();
  }

  recalculateAll(): void {
    for (let category of this.categories) {
      for (let req of category.requirements) {
        req.updateValidity();
      }
      category.calculateStats();
    }
    
    this.updateSummary();
  }

  private updateSummary(): void {
    for (let summaryItem of this.summary) {
      const category = this.categories.find(c => c.name === summaryItem.securityCategory);
      if (category) {
        summaryItem.updateFromCategory(category);
      }
    }

    let totalSummary = this.summary.find(s => s.securityCategory === 'Total');
    if (!totalSummary) {
      totalSummary = new Summary({ securityCategory: 'Total' });
      this.summary.push(totalSummary);
    }

    totalSummary.validCriteria = this.getTotalValid();
    totalSummary.totalCriteria = this.getTotalCriteria();
    totalSummary.validityPercentage = totalSummary.totalCriteria > 0
      ? Math.round((totalSummary.validCriteria / totalSummary.totalCriteria) * 100 * 100) / 100
      : 0;
    totalSummary.asvsLevelAcquired = this.getOverallLevel();
  }

  getAllRequirements(): Requirement[] {
    const all: Requirement[] = [];
    for (let category of this.categories) {
      all.push(...category.requirements);
    }
    return all;
  }

  getTotalCriteria(): number {
    return this.categories.reduce((sum, cat) => sum + cat.totalCriteria, 0);
  }

  getTotalValid(): number {
    return this.categories.reduce((sum, cat) => sum + cat.validCriteria, 0);
  }

  getTotalInvalid(): number {
    return this.categories.reduce((sum, cat) => sum + cat.getInvalidCount(), 0);
  }

  getTotalNotApplicable(): number {
    return this.categories.reduce((sum, cat) => sum + cat.getNotApplicableCount(), 0);
  }

  getTotalCompleted(): number {
    return this.categories.reduce((sum, cat) => sum + cat.getCompletedCount(), 0);
  }

  getTotalRemaining(): number {
    return this.categories.reduce((sum, cat) => sum + cat.getRemainingCount(), 0);
  }

  getOverallPercentage(): number {
    const total = this.getTotalCriteria();
    const valid = this.getTotalValid();
    return total > 0 ? Math.round((valid / total) * 100 * 100) / 100 : 0;
  }

  getOverallLevel(): number {
    const levels = this.categories.map(c => c.asvsLevelAcquired);
    return levels.length > 0 ? Math.min(...levels) : 0;
  }
}