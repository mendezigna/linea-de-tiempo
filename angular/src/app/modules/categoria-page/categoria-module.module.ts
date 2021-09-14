import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaPageComponent } from './categoria-page.component';
import { RouterModule, Routes } from '@angular/router';

const categoriaRoutes: Routes = [
  {
    path:      '',
    component: CategoriaPageComponent
  },
  
];

@NgModule({
  declarations: [CategoriaPageComponent],
  imports: [
    RouterModule.forChild(categoriaRoutes),
    CommonModule
  ],
  exports: [CategoriaPageComponent]
})
export class CategoriaModule { }
