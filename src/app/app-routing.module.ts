import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { HomeComponent } from './Home/home/home.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
