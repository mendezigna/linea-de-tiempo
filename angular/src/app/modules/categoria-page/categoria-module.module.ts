import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaPageComponent } from './categoria-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../ui/material.module';
import { CategoriaService } from './categoria.service';

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
    CommonModule,

  ],
  providers: [CategoriaService],
  exports: [CategoriaPageComponent]
})
export class CategoriaModule { }
