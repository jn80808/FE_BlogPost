import { afterNextRender, Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {


  model : AddCategoryRequest;
  private addCategorySubscribtion?:  Subscription

  constructor (private categoryService : CategoryService, private router: Router){
    this.model = {
      name : "",
      UrlHandle: "",
      Description: ""
      
    };
  }


  onFormSubmit() {
    this.addCategorySubscribtion = this.categoryService.addCategory(this.model)
      .subscribe({
        next: (response) => {
          console.log('Category added successfully:', this.model);
          this.router.navigateByUrl('/categories')
        },
        error: (error) => {
          console.error('Error adding category:', error);
        }
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscribtion?.unsubscribe();
  }
  

}  
