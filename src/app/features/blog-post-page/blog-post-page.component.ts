import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blog-post/models/blog-post.model';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../blog-post/services/blog-post.service';

@Component({
  selector: 'app-blog-post-page',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.css']
})
export class BlogPostPageComponent implements OnInit {
  blogPost?: BlogPost;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit(): void {
    const urlHandle = this.route.snapshot.paramMap.get('urlHandle');//urlHandle if from the parameter passing in app-routing 
    if (urlHandle) {
      this.blogPostService.getBlogByUrlHandle(urlHandle).subscribe({
        next: (response) => {
          this.blogPost = response;
        },
        error: (err: any) => {
          console.error('Failed to fetch blog post:', err);
          this.errorMessage = 'Blog post not found.';
        }
      });
    }
  }
}
