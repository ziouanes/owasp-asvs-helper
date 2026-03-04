import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../models/category';
import { Requirement } from '../../../models/requirement';
import { RequirementListComponent } from '../requirement-list/requirement-list.component';
import { OptionGroupComponent } from '../../molecules/option-group/option-group.component';
import { AiExplanationPanelComponent } from '../ai-explanation-panel/ai-explanation-panel.component';
import { AiTab } from '../../molecules/tabs/tabs.component';

@Component({
  selector: 'app-requirements-panel',
  standalone: true,
  imports: [RequirementListComponent, OptionGroupComponent, AiExplanationPanelComponent],
  templateUrl: './requirements-panel.component.html',
  styleUrl: './requirements-panel.component.css'
})
export class RequirementsPanelComponent {
  @Input() selectedCategory: Category | null = null;
  @Input() selectedRequirement: Requirement | null = null;
  @Input() showAiExplanation = false;
  @Input() aiExplanation = '';
  @Input() aiLoading = false;
  @Input({ required: true }) activeTab!: AiTab;

  @Output() requirementSelected = new EventEmitter<Requirement>();
  @Output() requirementClosed = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<number>();
  @Output() aiExplanationRequested = new EventEmitter<void>();
  @Output() bestPracticesRequested = new EventEmitter<void>();
  @Output() codeExampleRequested = new EventEmitter<void>();
  @Output() testingRequested = new EventEmitter<void>();
  @Output() aiPanelHidden = new EventEmitter<void>();
}
