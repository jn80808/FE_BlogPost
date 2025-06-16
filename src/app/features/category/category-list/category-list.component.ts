import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable, Subscriber } from 'rxjs';
import { Category } from '../models/category.model';
import { Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

categories$?: Observable<Category[]>;
id : string | null = null;
totalCount?: number;
list: number[]= [];

pageNumber = 1;
pageSize = 5;


constructor (private categoryService : CategoryService,
   private router: Router){

}

ngOnInit(): void {
  
  this.categoryService.getCategoryCount()
  .subscribe({
    next: (value) => {

      this.totalCount = value ;

      this.list = new Array(Math.ceil(value/this.pageSize))

      this.categories$ = this.categoryService.getAllCategories(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      );
    }
  })

}




onSearch(query: string): void {
    // alert(query);
    this.categories$ = this.categoryService.getAllCategories(query);
    
}

sort(sortBy: string, sortDirection: string){
 this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
}

getPage(pageNumber: number ){
      this.pageNumber = pageNumber
      this.categories$ = this.categoryService.getAllCategories(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      );
}

getNextPage (){
      if(this.pageNumber + 1> this.list.length) {
        return;
      }

      this.pageNumber+=1;
      this.categories$ = this.categoryService.getAllCategories(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      );
}

getPrevPage (){
      if(this.pageNumber - 1 < 1) {
        return;
      }

      this.pageNumber-=1;
      this.categories$ = this.categoryService.getAllCategories(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      );
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
