import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from '../../../models/option';

@Component({
  selector: 'app-option-item',
  standalone: true,
  templateUrl: './option-item.component.html',
  styleUrl: './option-item.component.css'
})
export class OptionItemComponent {
  @Input({ required: true }) option!: Option;
  @Input({ required: true }) groupName!: string;
  @Output() optionSelected = new EventEmitter<number>();
}
