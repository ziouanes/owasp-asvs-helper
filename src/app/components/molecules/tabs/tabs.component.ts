import { Component, EventEmitter, Input, Output } from '@angular/core';

export type AiTab = 'explanation' | 'bestPractices' | 'codeExample' | 'testing';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  @Input({ required: true }) activeTab!: AiTab;
  @Output() tabSelected = new EventEmitter<AiTab>();

  readonly items: Array<{ id: AiTab; label: string }> = [
    { id: 'explanation', label: '📖 Explanation' },
    { id: 'bestPractices', label: '✅ Best Practices' },
    { id: 'codeExample', label: '💻 Code Example' },
    { id: 'testing', label: '🧪 Testing' }
  ];
}
