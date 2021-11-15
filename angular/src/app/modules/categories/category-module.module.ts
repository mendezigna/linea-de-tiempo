import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../ui/material.module';
import { CategoryService } from './category.service';
import { CategoryPageComponent } from './category-page/category-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared-module';

const categoryRoutes: Routes = [
  {
    path:      ':category',
    component: CategoryPageComponent
  },
  { path: '', redirectTo: '/error', pathMatch: 'full' }

];

@NgModule({
  declarations: [CategoriesPageComponent, CategoryPageComponent],
  imports: [
    RouterModule.forChild(categoryRoutes),
    CommonModule,
    MaterialModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [CategoryService],
  exports: [CategoriesPageComponent, CategoryPageComponent]
})
export class CategoryModule { }
