import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BlogPost } from '../models/blog-post.model';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../models/Update-blog-post';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor( private http: HttpClient) { }

  getAllBlogPost(query?:string, sortBy?: string, sortDirection?: string,
    pageNumber?: number ,pageSize?: number): Observable<BlogPost[]>{
        let params = new HttpParams();
    
        if (query){
          params = params.set('query', query)
        }
    
      if (sortBy){
        params = params.set('sortBy',sortBy)
      }

      if (sortDirection){
        params = params.set('sortDirection',sortDirection)
      }

      if (pageNumber){
        params = params.set('pageNumber',pageNumber)
      }

      if (pageSize){
        params = params.set('pageSize',pageSize)
      }


        
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPost`,{
      params: params
    });
  }
  getBlogPostCount() : Observable<number>{
    return  this.http.get<number>(`${environment.apiBaseUrl}/api/BlogPost/count`)
  }

  
  getBlogPostById(id: string):Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}`);
  }

  getBlogByUrlHandle(handle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/by-url/${handle}`);
  }

  createBlogPost(data: AddBlogPost) : Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost?addAuth=true`, data);
  }

  updateBlogPost(id: string, updateBlogPost: UpdateBlogPost): Observable<BlogPost>{
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}?addAuth=true`,updateBlogPost );
  }

  deleteBlogPost(id:string): Observable<BlogPost>{
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/BlogPost/${id}?addAuth=true`);
  }

  
  

}
