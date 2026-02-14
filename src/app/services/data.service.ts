// src/app/services/data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Checklist } from '../models/checklist';
import { Requirement } from '../models/requirement';
import { asvsData } from '../data/asvs-data';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private checklistSubject = new BehaviorSubject<Checklist | null>(null);
  public checklist$: Observable<Checklist | null> = this.checklistSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadChecklist();
  }

  loadChecklist(): void {
    console.log('📥 Loading checklist...');
    
    const saved = this.storageService.loadProgress();
    
    if (saved) {
      console.log('✅ Loaded from localStorage');
      this.checklistSubject.next(saved);
    } else {
      console.log('✅ Loading from original data');
      const checklist = new Checklist(asvsData);
      this.checklistSubject.next(checklist);
      console.log('📊 Checklist loaded:', checklist);
    }
  }

  selectOption(categoryName: string, reqId: string, optionId: number): void {
    const checklist = this.checklistSubject.value;
    if (!checklist) return;

    const category = checklist.categories.find(c => c.name === categoryName);
    if (!category) return;

    const requirement = category.requirements.find(r => r.id === reqId);
    if (!requirement) return;

    requirement.options.forEach(o => o.isSelected = false);

    const selectedOption = requirement.options.find(o => o.id === optionId);
    if (selectedOption) {
      selectedOption.isSelected = true;
    }

    requirement.updateValidity();
    checklist.recalculateAll();
    this.checklistSubject.next(checklist);
    this.storageService.saveProgress(checklist);

    console.log(`✅ Option ${optionId} selected for ${reqId}`);
  }

  updateRequirement(categoryName: string, reqId: string, updates: Partial<Requirement>): void {
    const checklist = this.checklistSubject.value;
    if (!checklist) return;

    const category = checklist.categories.find(c => c.name === categoryName);
    if (!category) return;

    const requirement = category.requirements.find(r => r.id === reqId);
    if (!requirement) return;

    Object.assign(requirement, updates);
    requirement.lastUpdated = new Date();

    checklist.recalculateAll();
    this.checklistSubject.next(checklist);
    this.storageService.saveProgress(checklist);
  }

  exportToJSON(): void {
    const checklist = this.checklistSubject.value;
    if (!checklist) return;

    const dataStr = JSON.stringify(checklist, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = window.URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `asvs-progress-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    window.URL.revokeObjectURL(url);
  }

  resetToDefault(): void {
    this.storageService.clearProgress();
    this.loadChecklist();
  }
}