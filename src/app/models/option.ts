export class Option {
  id: number;
  name: string;
  requirementId: string;     // بدلاً من questionId
  isAnswer: boolean;         // هل هذا هو الخيار الصحيح؟
  isSelected: boolean;       // هل اختاره المستخدم؟

  constructor(data: any) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.requirementId = data.requirementId || data.questionId || '';
    this.isAnswer = data.isAnswer || false;
    this.isSelected = data.isSelected || false;
  }
}