import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { HomeComponent } from './Home/home/home.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomePComponent } from './features/public/home-p/home-p.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { BlogPostPageComponent } from './features/blog-post-page/blog-post-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent  // Default route for HomeComponent
  },
  {
    path: 'homePublicView',
    component: HomePComponent  //  Latest Blog Posts 
  },
  {
    path: 'login',
    component: LoginComponent  
  },
  {
    path: 'BlogDetails',
    component: BlogDetailsComponent  
  },
  //Admin Page
  {
    path:'categories',
    component: CategoryListComponent,
    canActivate: [authGuard]
  },
  {
    path:'categories/add',
    component: AddCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path:'categories/:id',
    component: EditCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path:'blogposts',
    component: BlogpostListComponent,
    canActivate: [authGuard]
  },
  {
    path:'blogposts/add',
    component: AddBlogpostComponent,
    canActivate: [authGuard]
  },
  {
    path:'blogposts/edit/:id',
    component: EditBlogpostComponent,
    canActivate: [authGuard]
  },
  {
    path:'blog/:urlHandle',
    component: BlogPostPageComponent,
    canActivate: [authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
