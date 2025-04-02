import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { AddBlogPost } from '../models/add-blog-post.models';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  categories: Category[] = []; // Store categories
  model: AddBlogPost;
  

  constructor(private categoryService: CategoryService, 
    private blogPostService: BlogPostService,
    private router: Router) {
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

  
  onFormSubmit(): void {
    console.log('Form Data:', this.model); // Debugging output
    this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (response) => {
          console.log('Blog post created:', response);
          this.router.navigateByUrl('/blogposts');
        },
        error: (err) => {
          console.error('Error creating blog post:', err);
        }
      });
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


