import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable, Subscriber } from 'rxjs';
import { Category } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

categories$?: Observable<Category[]>;
id : string | null = null;


constructor (private categoryService : CategoryService,
   private router: Router
){

}
ngOnInit(): void {
  this.categories$ = this.categoryService.getAllCategories();
}


onSearch(query: string): void {
    // alert(query);
    this.categories$ = this.categoryService.getAllCategories(query);
    
}


onDelete(id: string): void {
  this.categoryService.deleteCategory(id)
    .subscribe({
      next: (response) => {
        // Refresh the list after delete
        this.categories$ = this.categoryService.getAllCategories();
      }
    });
}







}
