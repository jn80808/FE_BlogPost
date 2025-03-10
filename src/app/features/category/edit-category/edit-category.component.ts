import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy{

  id : string | null = null;
  paramsSubscription?: Subscription;
  

  constructor (private route : ActivatedRoute){

  }
 
  ngOnInit(): void {
    this.paramsSubscription =  this.route.paramMap.subscribe({
      next: (param) =>{
        this.id =  param.get('id');

        if (this.id){
          // get the data from the API for this category Id

          
        }


      }
    })
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
  


}
