
import { ValidStatus } from './valid-status';
import { Option } from './option';

export class Requirement {
  area: string;
  id: string;
  asvsLevel: number;
  cwe?: number;
  nist?: string;
  verificationRequirement: string;
  
  options: Option[];
  valid: ValidStatus;
  
  sourceCodeReference: string;
  comment: string;
  toolUsed: string;
  aiExplanation?: string;
  
  lastUpdated: Date;

  constructor(data: any) {
    this.area = data['Area'] || data.area || '';
    this.id = data['#'] || data.id || '';
    this.asvsLevel = data['ASVS Level'] || data.asvsLevel || 1;
    this.cwe = data['CWE'] || data.cwe;
    this.nist = data['NIST'] || data.nist;
    this.verificationRequirement = data['Verification Requirement'] || data.verificationRequirement || '';
    
    this.options = [];
    if (data.options && data.options.length > 0) {
      for (let optData of data.options) {
        this.options.push(new Option(optData));
      }
    } else {
      this.createDefaultOptions();
    }
    
    this.sourceCodeReference = data.sourceCodeReference || '';
    this.comment = data.comment || '';
    this.toolUsed = data.toolUsed || '';
    this.aiExplanation = data.aiExplanation;
    this.lastUpdated = data.lastUpdated ? new Date(data.lastUpdated) : new Date();
    
    this.valid = this.calculateValidity();
  }

  private createDefaultOptions(): void {
    this.options = [
      new Option({
        id: 1,
        name: '✅ Implemented (Valid)',
        requirementId: this.id,
        isAnswer: true,
        isSelected: false
      }),
      new Option({
        id: 2,
        name: '❌ Not Implemented (Invalid)',
        requirementId: this.id,
        isAnswer: false,
        isSelected: false
      }),
      new Option({
        id: 3,
        name: '⚪ Not Applicable',
        requirementId: this.id,
        isAnswer: false,
        isSelected: false
      })
    ];
  }

  calculateValidity(): ValidStatus {
    const selectedOption = this.options.find(o => o.isSelected);
    
    if (!selectedOption) {
      return ValidStatus.NOT_STARTED;
    }
    
    if (selectedOption.id === 3) {
      return ValidStatus.NOT_APPLICABLE;
    }
    
    if (selectedOption.isAnswer) {
      return ValidStatus.VALID;
    }
    
    return ValidStatus.INVALID;
  }

  isAnswered(): boolean {
    return this.options.some(o => o.isSelected);
  }

  isCorrect(): boolean {
    const selectedOption = this.options.find(o => o.isSelected);
    return selectedOption ? selectedOption.isAnswer : false;
  }

  isCompleted(): boolean {
    return this.valid !== ValidStatus.NOT_STARTED;
  }

  updateValidity(): void {
    this.valid = this.calculateValidity();
    this.lastUpdated = new Date();
  }
}