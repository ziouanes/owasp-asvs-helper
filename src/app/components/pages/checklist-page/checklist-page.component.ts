import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Checklist } from '../../../models/checklist';
import { Category } from '../../../models/category';
import { Requirement } from '../../../models/requirement';
import { DashboardSummaryComponent } from '../../organisms/dashboard-summary/dashboard-summary.component';
import { SummaryTableComponent } from '../../organisms/summary-table/summary-table.component';
import { CategoryListComponent } from '../../organisms/category-list/category-list.component';
import { RequirementsPanelComponent } from '../../organisms/requirements-panel/requirements-panel.component';
import { AiTab } from '../../molecules/tabs/tabs.component';

@Component({
  selector: 'app-checklist-page',
  standalone: true,
  imports: [
    DashboardSummaryComponent,
    SummaryTableComponent,
    CategoryListComponent,
    RequirementsPanelComponent
  ],
  templateUrl: './checklist-page.component.html',
  styleUrl: './checklist-page.component.css'
})
export class ChecklistPageComponent {
  @Input({ required: true }) checklist!: Checklist;
  @Input() selectedCategory: Category | null = null;
  @Input() selectedRequirement: Requirement | null = null;
  @Input() showAiExplanation = false;
  @Input() aiExplanation = '';
  @Input() aiLoading = false;
  @Input({ required: true }) activeTab!: AiTab;

  @Output() categorySelected = new EventEmitter<Category>();
  @Output() requirementSelected = new EventEmitter<Requirement>();
  @Output() requirementClosed = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<number>();
  @Output() aiExplanationRequested = new EventEmitter<void>();
  @Output() bestPracticesRequested = new EventEmitter<void>();
  @Output() codeExampleRequested = new EventEmitter<void>();
  @Output() testingRequested = new EventEmitter<void>();
  @Output() aiPanelHidden = new EventEmitter<void>();
}
