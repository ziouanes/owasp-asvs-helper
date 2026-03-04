import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from '../../../models/option';
import { OptionItemComponent } from '../option-item/option-item.component';

@Component({
  selector: 'app-option-group',
  standalone: true,
  imports: [OptionItemComponent],
  templateUrl: './option-group.component.html'
})
export class OptionGroupComponent {
  @Input({ required: true }) requirementId!: string;
  @Input({ required: true }) options!: Option[];
  @Output() optionSelected = new EventEmitter<number>();
}
