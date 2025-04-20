import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { EditBlogPost } from '../models/Edit-blog-post';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  categories: Category[] = []; // Store categories
  id:string | null = null;
  routeSubscription?: Subscription
  model?: BlogPost
  modelEdit?:EditBlogPost
  categories$?: Observable<Category[]>;

  constructor (
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
    ){

  }
 
  ngOnInit(): void {
   
  this.loadCategories(); // Fetch categories from the service

   this.categories$ = this.categoryService.getAllCategories();

    // Get blog post ID from the route and fetch the blog post
    this.routeSubscription = this.route.paramMap.subscribe({
      next:(params) => {
       this.id = params.get('id');

        //Get BlogPost from API 
        if(this.id){
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) =>{
              this.model = response;

            }
          })
        }
        
      }
    })
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

  //Toggle category ID in the selected categories list
  toggleCategory(categoryId: string): void {
    if (!this. modelEdit) return;

    const index = this. modelEdit.categories.indexOf(categoryId);

    if (index === -1) {
      this. modelEdit.categories.push(categoryId); //  Add category if not already selected
    } else {
      this. modelEdit.categories.splice(index, 1); //  Remove category if already selected
    }
  }

  onFormSubmit():void{
    
  }


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }


}
