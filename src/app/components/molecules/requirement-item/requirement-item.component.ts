import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Requirement } from '../../../models/requirement';

@Component({
  selector: 'app-requirement-item',
  standalone: true,
  templateUrl: './requirement-item.component.html'
})
export class RequirementItemComponent {
  @Input({ required: true }) requirement!: Requirement;
  @Output() openRequirement = new EventEmitter<Requirement>();

  get statusLabel(): string {
    switch (this.requirement.valid) {
      case 'Valid':
        return '✅ Valid';
      case 'Invalid':
        return '❌ Invalid';
      case 'Not Applicable':
        return '⚪ N/A';
      default:
        return '⏳ Pending';
    }
  }

  get statusColor(): string {
    switch (this.requirement.valid) {
      case 'Valid':
        return '#27ae60';
      case 'Invalid':
        return '#e74c3c';
      case 'Not Applicable':
        return '#95a5a6';
      default:
        return '#f39c12';
    }
  }
}
