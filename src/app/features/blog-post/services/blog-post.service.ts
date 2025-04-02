import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor() { }

  createBlogPost(data: AddBlogPost) : Observable<>
  {

  }

}
