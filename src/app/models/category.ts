// src/app/models/category.ts

import { Requirement } from './requirement';
import { ValidStatus } from './valid-status';

export class Category {
  name: string;
  requirements: Requirement[];
  
  validCriteria: number;
  totalCriteria: number;
  validityPercentage: number;
  asvsLevelAcquired: number;

  constructor(name: string, requirementsData: any[]) {
    this.name = name;
    this.requirements = [];
    
    if (requirementsData && requirementsData.length > 0) {
      for (let reqData of requirementsData) {
        this.requirements.push(new Requirement(reqData));
      }
    }
    
    this.totalCriteria = this.requirements.length;
    this.validCriteria = 0;
    this.validityPercentage = 0;
    this.asvsLevelAcquired = 0;
    
    this.calculateStats();
  }

  calculateStats(): void {
    this.validCriteria = this.requirements.filter(
      r => r.valid === ValidStatus.VALID
    ).length;
    
    this.validityPercentage = this.totalCriteria > 0 
      ? Math.round((this.validCriteria / this.totalCriteria) * 100 * 100) / 100
      : 0;
    
    this.asvsLevelAcquired = this.calculateAcquiredLevel();
  }

  private calculateAcquiredLevel(): number {
    const level1Reqs = this.requirements.filter(r => r.asvsLevel === 1);
    const level1Valid = level1Reqs.filter(r => r.valid === ValidStatus.VALID).length;
    const level1Achieved = level1Reqs.length > 0 && level1Valid === level1Reqs.length;

    const level2Reqs = this.requirements.filter(r => r.asvsLevel <= 2);
    const level2Valid = level2Reqs.filter(r => r.valid === ValidStatus.VALID).length;
    const level2Achieved = level2Reqs.length > 0 && level2Valid === level2Reqs.length;

    const level3Reqs = this.requirements.filter(r => r.asvsLevel <= 3);
    const level3Valid = level3Reqs.filter(r => r.valid === ValidStatus.VALID).length;
    const level3Achieved = level3Reqs.length > 0 && level3Valid === level3Reqs.length;

    if (level3Achieved) return 3;
    if (level2Achieved) return 2;
    if (level1Achieved) return 1;
    return 0;
  }

  getCompletedCount(): number {
    return this.requirements.filter(r => r.isCompleted()).length;
  }

  getRemainingCount(): number {
    return this.requirements.filter(r => r.valid === ValidStatus.NOT_STARTED).length;
  }

  getInvalidCount(): number {
    return this.requirements.filter(r => r.valid === ValidStatus.INVALID).length;
  }

  getNotApplicableCount(): number {
    return this.requirements.filter(r => r.valid === ValidStatus.NOT_APPLICABLE).length;
  }
}