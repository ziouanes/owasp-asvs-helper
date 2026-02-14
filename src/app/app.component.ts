import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { Checklist } from './models/checklist';
import { Category } from './models/category';
import { Requirement } from './models/requirement';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  checklist: Checklist | null = null;
  selectedCategory: Category | null = null;
  selectedRequirement: Requirement | null = null;

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.checklist$.subscribe(checklist => {
      this.checklist = checklist;
      console.log('✅ Checklist loaded:', checklist);
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.selectedRequirement = null;
  }

  selectRequirement(req: Requirement): void {
    this.selectedRequirement = req;
  }

  selectOption(optionId: number): void {
    if (!this.selectedCategory || !this.selectedRequirement) return;
    
    this.dataService.selectOption(
      this.selectedCategory.name,
      this.selectedRequirement.id,
      optionId
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
