import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { AiService } from '../../../services/ai.service';
import { Checklist } from '../../../models/checklist';
import { Category } from '../../../models/category';
import { Requirement } from '../../../models/requirement';
import { ChecklistPageComponent } from '../../../components/pages/checklist-page/checklist-page.component';
import { AppHeaderComponent } from '../../../components/organisms/app-header/app-header.component';

@Component({
  selector: 'app-checklist-shell',
  standalone: true,
  imports: [CommonModule, AppHeaderComponent, ChecklistPageComponent],
  templateUrl: './checklist-shell.component.html',
  styleUrl: './checklist-shell.component.css'
})
export class ChecklistShellComponent implements OnInit {
  checklist: Checklist | null = null;
  selectedCategory: Category | null = null;
  selectedRequirement: Requirement | null = null;

  showAiExplanation: boolean = false;
  aiExplanation: string = '';
  aiLoading: boolean = false;
  activeTab: 'explanation' | 'bestPractices' | 'codeExample' | 'testing' = 'explanation';

  constructor(
    public dataService: DataService,
    public aiService: AiService
  ) {}

  ngOnInit(): void {
    this.dataService.checklist$.subscribe(checklist => {
      this.checklist = checklist;
      console.log('✅ Checklist loaded:', checklist);
    });

    this.aiService.isLoading$.subscribe(loading => {
      this.aiLoading = loading;
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.selectedRequirement = null;
  }

  selectRequirement(req: Requirement): void {
    this.selectedRequirement = req;
    this.showAiExplanation = false;
    this.aiExplanation = '';
    this.activeTab = 'explanation';
  }

  closeRequirement(): void {
    this.selectedRequirement = null;
  }

  hideAiPanel(): void {
    this.showAiExplanation = false;
  }

  selectOption(optionId: number): void {
    if (!this.selectedCategory || !this.selectedRequirement) return;

    this.dataService.selectOption(
      this.selectedCategory.name,
      this.selectedRequirement.id,
      optionId
    );
  }

  async loadAiExplanation(): Promise<void> {
    if (!this.selectedRequirement) return;

    this.showAiExplanation = true;
    this.activeTab = 'explanation';

    if (this.selectedRequirement.aiExplanation) {
      this.aiExplanation = this.selectedRequirement.aiExplanation;
      return;
    }

    this.aiExplanation = await this.aiService.getExplanation(
      this.selectedRequirement.verificationRequirement
    );

    if (this.selectedCategory && this.selectedRequirement) {
      this.selectedRequirement.aiExplanation = this.aiExplanation;
      this.dataService.updateRequirement(
        this.selectedCategory.name,
        this.selectedRequirement.id,
        { aiExplanation: this.aiExplanation }
      );
    }
  }

  async loadBestPractices(): Promise<void> {
    if (!this.selectedRequirement) return;

    this.activeTab = 'bestPractices';
    this.aiExplanation = await this.aiService.getBestPractices(
      this.selectedRequirement.verificationRequirement
    );
  }

  async loadCodeExample(): Promise<void> {
    if (!this.selectedRequirement) return;

    this.activeTab = 'codeExample';
    this.aiExplanation = await this.aiService.getCodeExample(
      this.selectedRequirement.verificationRequirement,
      'C#'
    );
  }

  async loadTestingGuidance(): Promise<void> {
    if (!this.selectedRequirement) return;

    this.activeTab = 'testing';
    this.aiExplanation = await this.aiService.getTestingGuidance(
      this.selectedRequirement.verificationRequirement
    );
  }

  reset(): void {
    if (confirm('Are you sure you want to reset all progress?')) {
      this.dataService.resetToDefault();
    }
  }
}
