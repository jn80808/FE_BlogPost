import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/BlogCategory`, model);
  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/BlogCategory`)
  }

  getCategoryById(id: string) : Observable<Category>{
    return  this.http.get<Category>(`${environment.apiBaseUrl}/api/BlogCategory/${id}`)
  }

  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest) : 
  Observable <Category> {
    return  this.http.put<Category>(`${environment.apiBaseUrl}/api/BlogCategory/${id}`, updateCategoryRequest)

  }



}


