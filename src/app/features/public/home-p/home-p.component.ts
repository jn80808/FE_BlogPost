import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-home-p',
  templateUrl: './home-p.component.html',
  styleUrls: ['./home-p.component.css']
})
export class HomePComponent implements OnInit{

  blogs$?: Observable<BlogPost[]>

  constructor(private blogPostService: BlogPostService){

  }


  ngOnInit(): void {
    this.blogs$ = this.blogPostService.getAllBlogPost();
  }


}
