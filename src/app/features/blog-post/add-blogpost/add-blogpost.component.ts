import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { AddBlogPost } from '../models/add-blog-post.models';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/Shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit,OnDestroy {
  categories: Category[] = []; // Store categories
  model: AddBlogPost;
  isImageSelectorVisible: boolean = false;
  imageSelectedSubscription?: Subscription;
  
  

  constructor(
    private categoryService: CategoryService,
    private blogPostService: BlogPostService,
    private router: Router,
    private imageSevice : ImageService
  ) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featureImageUrl: '',
      authorName: '',
      urlHandle: '',
      publishedDate: new Date(),
      isVisible: true,
      isPublished: true,
      categories: [] //  updated from categoryIds to categories since dtoblogpost is categories 
    };
  }

  ngOnInit(): void {
    this.loadCategories();

    this.imageSelectedSubscription = this.imageSevice.onSelectImage()
    .subscribe({
      next:(selectedImage) =>{
        if (this.model){
          this.model.featureImageUrl = selectedImage.url;
          this.closeImageSelector();
        }}
    })

  }

  onFormSubmit(): void {
    if (!this.model.categories || this.model.categories.length === 0) {
      console.error('At least one category is required');
      return;
    }

    console.log('Form Data:', this.model);

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

  openImageSelector():void{
    this.isImageSelectorVisible = true;

  }

  closeImageSelector():void{
    this.isImageSelectorVisible = false;
  }

  toggleCategory(categoryId: string): void {
    const index = this.model.categories.indexOf(categoryId);
    if (index === -1) {
      this.model.categories.push(categoryId);
    } else {
      this.model.categories.splice(index, 1);
    }
  }

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

  ngOnDestroy(): void {
    this.imageSelectedSubscription?.unsubscribe();
  }

  
}

