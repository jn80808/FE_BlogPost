import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>;
  deleteBlogPostSubscription?: Subscription;
  id:string | null = null;

constructor(
  private blogpostService: BlogPostService,
  private router:Router
){

}

  ngOnInit(): void {
    //get all blog posts from API
    this.blogPosts$ = this.blogpostService.getAllBlogPost();
  }

  onDelete(id: string): void {
    console.log('Delete button clicked for ID:', id); // now this will show the correct ID
  
    this.deleteBlogPostSubscription = this.blogpostService.deleteBlogPost(id)
      .subscribe({
        next: (response) => {
          console.log('Deleted successfully');
          this.blogPosts$ = this.blogpostService.getAllBlogPost(); // Refresh list
        },
        error: (err) => {
          console.error('Delete error:', err);
        }
      });
  }
  

  searchQuery: string = '';

  onSearch(): void {
      this.blogPosts$ = this.blogpostService.getAllBlogPost();
  }



}
