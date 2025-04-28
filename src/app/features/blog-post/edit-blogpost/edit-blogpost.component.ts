import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/Update-blog-post';
import { ImageService } from 'src/app/Shared/components/image-selector/image.service';


@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css'],

})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  //Variable 
  categories: Category[] = []; // Store categories
  id:string | null = null;
  model?: BlogPost
  modelUpdate?:UpdateBlogPost
  categories$?: Observable<Category[]>;
  selectedCategories?:string[]
  isImageSelectorVisible: boolean = false;

  //for unsubsription 
  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectedSubscription?: Subscription;


  constructor (
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private router:Router,
    private imageSevice : ImageService
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
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) =>{
              this.model = response;

            }
          })
        }
        this.imageSelectedSubscription = this.imageSevice.onSelectImage()
        .subscribe({
          next:(response) =>{
            if (this.model){
              this.model.featureImageUrl = response.url;
              this.closeImageSelector();
            }}
        })
        
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
    if (!this.model) return;
  
    if (!this.model.category) {
      this.model.category = [];
    }
  
    const index = this.model.category.indexOf(categoryId);
  
    if (index === -1) {
      this.model.category.push(categoryId);
    } else {
      this.model.category.splice(index, 1);
    }
  }
  

  onFormSubmit():void{
    //Convert the model to Request Object 
    if (this.model && this.id){
      var UpdateBlogPost: UpdateBlogPost ={
            authorName: this.model.authorName,
            content: this.model.content,
            shortDescription: this.model.shortDescription,
            featureImageUrl: this.model.featureImageUrl,
            isVisible: this.model.isVisible,
            isPublished: this.model.isVisible,
            publishedDate: this.model.publishedDate,
            title: this.model.title,
            urlHandle: this.model.urlHandle,
            categories: this.model.category

      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, UpdateBlogPost)
      .subscribe({
        next: (response) =>{
          this.router.navigateByUrl('/blogposts');//back to blogpostlist page 
        }
      });
    }
  }

  openImageSelector():void{
    this.isImageSelectorVisible = true;

  }

  closeImageSelector():void{
    this.isImageSelectorVisible = false;
  }

  onDelete(): void {
    console.log('Delete button clicked'); // ← check if this prints
    if (this.id) {
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/blogposts');
          },
          error: (err) => {
            console.error('Delete error:', err);
          }
        });
    }
  }
  

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectedSubscription?.unsubscribe();
  }


}
