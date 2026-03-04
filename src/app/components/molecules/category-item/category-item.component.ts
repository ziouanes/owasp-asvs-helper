import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category-item',
  standalone: true,
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.css'
})
export class CategoryItemComponent {
  @Input({ required: true }) category!: Category;
  @Input() selected = false;

  @Output() selectedCategory = new EventEmitter<Category>();
}
