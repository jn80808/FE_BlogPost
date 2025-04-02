import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { AddBlogPost } from '../models/add-blog-post.models';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  categories: Category[] = []; // Store categories
  model: AddBlogPost;
  

  constructor(private categoryService: CategoryService) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featureImageUrl: '',
      authorName: '',
      urlHandle: '',
      publishedDate: new Date(),  
      isVisible: true,
      categoryId: '',  
      isPublished: true
    };
  }

  onFormSubmit():void{
    console.log(this.model);
  }



  ngOnInit(): void {
    this.loadCategories();
  }

  
  //to get the list of categories for the dropdown 
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
}


