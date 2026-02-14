// src/app/models/summary.ts

export class Summary {
  securityCategory: string;
  validCriteria: number;
  totalCriteria: number;
  validityPercentage: number;
  asvsLevelAcquired: number;

  constructor(data: any) {
    this.securityCategory = data['Security Category'] || data.securityCategory || '';
    this.validCriteria = data['Valid criteria'] || data.validCriteria || 0;
    this.totalCriteria = data['Total criteria'] || data.totalCriteria || 0;
    this.validityPercentage = data['Validity Percentage'] || data.validityPercentage || 0;
    this.asvsLevelAcquired = data['ASVS Level Acquired'] || data.asvsLevelAcquired || 0;
  }

  updateFromCategory(category: any): void {
    this.validCriteria = category.validCriteria;
    this.totalCriteria = category.totalCriteria;
    this.validityPercentage = category.validityPercentage;
    this.asvsLevelAcquired = category.asvsLevelAcquired;
  }
}