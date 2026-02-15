// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { AiService } from './services/ai.service';
import { Checklist } from './models/checklist';
import { Category } from './models/category';
import { Requirement } from './models/requirement';
import { MarkdownPipe } from './pipes/markdown.pipe';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule,MarkdownPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  checklist: Checklist | null = null;
  selectedCategory: Category | null = null;
  selectedRequirement: Requirement | null = null;

  // AI Explanation state
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

    // Subscribe to AI loading state
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

  selectOption(optionId: number): void {
    if (!this.selectedCategory || !this.selectedRequirement) return;
    
    this.dataService.selectOption(
      this.selectedCategory.name,
      this.selectedRequirement.id,
      optionId
    );
  }

  // ✅ AI Explanation Methods
  async loadAiExplanation(): Promise<void> {
    if (!this.selectedRequirement) return;

    this.showAiExplanation = true;
    this.activeTab = 'explanation';

    // Check if already loaded
    if (this.selectedRequirement.aiExplanation) {
      this.aiExplanation = this.selectedRequirement.aiExplanation;
      return;
    }

    // Load from AI
    this.aiExplanation = await this.aiService.getExplanation(
      this.selectedRequirement.verificationRequirement
    );

    // Save to requirement
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
      'C#' // يمكنك تغييرها حسب لغة البرمجة
    );
  }

  async loadTestingGuidance(): Promise<void> {
    if (!this.selectedRequirement) return;
    
    this.activeTab = 'testing';
    this.aiExplanation = await this.aiService.getTestingGuidance(
      this.selectedRequirement.verificationRequirement
    );
  }

  exportJSON(): void {
    this.dataService.exportToJSON();
  }

  reset(): void {
    if (confirm('Are you sure you want to reset all progress?')) {
      this.dataService.resetToDefault();
    }
  }


}