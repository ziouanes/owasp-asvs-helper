import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Requirement } from '../../../models/requirement';

@Component({
  selector: 'app-requirement-list',
  standalone: true,
  imports: [],
  templateUrl: './requirement-list.component.html',
  styleUrl: './requirement-list.component.css'
})
export class RequirementListComponent {
  @Input({ required: true }) requirements!: Requirement[];
  @Output() requirementSelected = new EventEmitter<Requirement>();
}
