import { Component, Input } from '@angular/core';
import { MarkdownPipe } from './markdown.pipe';

@Component({
  selector: 'app-markdown-viewer',
  standalone: true,
  imports: [MarkdownPipe],
  templateUrl: './markdown-viewer.component.html',
  styleUrl: './markdown-viewer.component.css'
})
export class MarkdownViewerComponent {
  @Input({ required: true }) content!: string;
}
