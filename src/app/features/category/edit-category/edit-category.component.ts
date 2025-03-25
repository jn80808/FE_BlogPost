import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.models';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy{

  id : string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;
  

  constructor (private route : ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router){

  }
 
  ngOnInit(): void {
    this.paramsSubscription =  this.route.paramMap.subscribe({
      next: (param) =>{
        this.id =  param.get('id');

        if (this.id){
          // get the data from the API for this category Id
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next:(response) => {
              this.category = response;
            }
          })
        }
      }
    })
  }

  onFormSubmit() : void{
    const updateCategoryRequest: UpdateCategoryRequest ={
      id: this.category?.id ?? '',
      name: this.category?.name ?? '',
      urlHandle : this.category?.urlHandle ?? '',
      description : this.category?.description ?? ''
    }
    //pass this object to service
    if (this.id){
       this.editCategorySubscription = this.categoryService.updateCategory(this.id,updateCategoryRequest)
          .subscribe({
          next:(response) =>{
            this.router.navigateByUrl('/categories');
        }
      })
    }

  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
  
  onDelete() : void{
    
  }
    

}
