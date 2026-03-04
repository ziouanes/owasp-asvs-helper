import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabsComponent, AiTab } from '../../molecules/tabs/tabs.component';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';
import { MarkdownViewerComponent } from '../../atoms/markdown-viewer/markdown-viewer.component';

@Component({
  selector: 'app-ai-explanation-panel',
  standalone: true,
  imports: [TabsComponent, SpinnerComponent, MarkdownViewerComponent],
  templateUrl: './ai-explanation-panel.component.html',
  styleUrl: './ai-explanation-panel.component.css'
})
export class AiExplanationPanelComponent {
  @Input() aiLoading = false;
  @Input() aiExplanation = '';
  @Input({ required: true }) activeTab!: AiTab;

  @Output() closePanel = new EventEmitter<void>();
  @Output() explanationRequested = new EventEmitter<void>();
  @Output() bestPracticesRequested = new EventEmitter<void>();
  @Output() codeExampleRequested = new EventEmitter<void>();
  @Output() testingRequested = new EventEmitter<void>();
  @Output() refreshRequested = new EventEmitter<void>();

  onTabSelected(tab: AiTab): void {
    switch (tab) {
      case 'explanation':
        this.explanationRequested.emit();
        break;
      case 'bestPractices':
        this.bestPracticesRequested.emit();
        break;
      case 'codeExample':
        this.codeExampleRequested.emit();
        break;
      case 'testing':
        this.testingRequested.emit();
        break;
    }
  }
}
