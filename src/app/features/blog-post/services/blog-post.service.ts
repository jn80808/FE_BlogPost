import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from '../models/blog-post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor( private http: HttpClient) { }

  createBlogPost(data: AddBlogPost) : Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost`, data);
  }

  getAllBlogPost(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPost`);
  }

  getBlogPostById(id: string):Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}`);
  }


}
