import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { HomeComponent } from './Home/home/home.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent  // Default route for HomeComponent
  },
  {
    path:'categories',
    component: CategoryListComponent
  },
  {
    path:'categories/add',
    component: AddCategoryComponent
  },
  {
    path:'categories/:id',
    component: EditCategoryComponent
  },
  {
    path:'blogposts',
    component: BlogpostListComponent
  },
  {
    path:'blogposts/add',
    component: AddBlogpostComponent
  },
  {
    path:'blogposts/:id',
    component: EditBlogpostComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
