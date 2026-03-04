import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryItemComponent } from '../../molecules/category-item/category-item.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryItemComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  @Input({ required: true }) categories!: Category[];
  @Input() selectedCategoryName: string | null = null;

  @Output() categorySelected = new EventEmitter<Category>();
}
