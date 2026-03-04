import { Component } from '@angular/core';
import { ChecklistShellComponent } from './ui/pages/checklist-shell/checklist-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChecklistShellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}