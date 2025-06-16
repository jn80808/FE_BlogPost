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

  totalCount?: number;
  list: number[]= [];

  pageNumber = 1;
  pageSize = 5;



constructor(
  private blogpostService: BlogPostService,
  private router:Router
){

}

  ngOnInit(): void {

      this.blogpostService.getBlogPostCount()
      .subscribe({
        next: (value) => {

          this.totalCount = value ;

          this.list = new Array(Math.ceil(value/this.pageSize))

        //get all blog posts from API
        this.blogPosts$ = this.blogpostService.getAllBlogPost(undefined,
            undefined,
            undefined,
            this.pageNumber,
            this.pageSize
          );
        }
      })
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
  

onSearch(query: string): void {
    // alert(query);
    this.blogPosts$ = this.blogpostService.getAllBlogPost(query);
    
}

sort(sortBy: string, sortDirection: string){
    this.blogPosts$ = this.blogpostService.getAllBlogPost(undefined, sortBy, sortDirection);
}


getPage(pageNumber: number ){
      this.pageNumber = pageNumber
      this.blogPosts$ = this.blogpostService.getAllBlogPost(
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
      this.blogPosts$ = this.blogpostService.getAllBlogPost(
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
      this.blogPosts$ = this.blogpostService.getAllBlogPost(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      );
}



}
