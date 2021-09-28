import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../ui/material.module';
import { CategoryService } from './category.service';
import { CategoryPageComponent } from './category-page/category-page.component';
import { HttpClientModule } from '@angular/common/http';

const categoryRoutes: Routes = [
  {
    path:      ':category',
    component: CategoryPageComponent
  },
  {
    path:      '',
    component: CategoryPageComponent
  }

];

@NgModule({
  declarations: [CategoriesPageComponent, CategoryPageComponent],
  imports: [
    RouterModule.forChild(categoryRoutes),
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [CategoryService],
  exports: [CategoriesPageComponent, CategoryPageComponent]
})
export class CategoryModule { }
