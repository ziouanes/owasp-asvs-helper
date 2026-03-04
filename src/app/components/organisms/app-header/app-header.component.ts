import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-app-header',
  standalone: true,
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  @Output() resetClicked = new EventEmitter<void>();
}
