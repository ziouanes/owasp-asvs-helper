import { Component, Input } from '@angular/core';
import { Checklist } from '../../../models/checklist';
import { StatCardComponent } from '../../molecules/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [StatCardComponent],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.css'
})
export class DashboardSummaryComponent {
  @Input({ required: true }) checklist!: Checklist;
}
