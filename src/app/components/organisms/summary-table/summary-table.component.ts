import { Component, Input } from '@angular/core';
import { Summary } from '../../../models/summary';

@Component({
  selector: 'app-summary-table',
  standalone: true,
  templateUrl: './summary-table.component.html',
  styleUrl: './summary-table.component.css'
})
export class SummaryTableComponent {
  @Input({ required: true }) summary!: Summary[];
}
