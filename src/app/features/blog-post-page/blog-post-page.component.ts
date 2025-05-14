import { Component } from '@angular/core';
import { BlogPost } from '../blog-post/models/blog-post.model';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../blog-post/services/blog-post.service';

@Component({
  selector: 'app-blog-post-page',
  templateUrl: './blog-post-page.component.html',
  styleUrls: ['./blog-post-page.component.css']
})
export class BlogPostPageComponent {


  blogPost?: BlogPost;
  urlHandle: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService
  ) {}

  ngOnInit(): void {
    this.urlHandle = this.route.snapshot.paramMap.get('urlHandle') || '';

    if (this.urlHandle) {
      this.blogPostService.getBlogByUrlHandle(this.urlHandle)
        .subscribe({
          next: (post) => this.blogPost = post,
          error: (err) => console.error('Error loading post:', err)
        });
    }
  }
}