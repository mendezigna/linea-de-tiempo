import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasPageComponent } from './categorias-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../ui/material.module';
import { CategoriaService } from './categoria.service';

const categoriaRoutes: Routes = [
  {
    path:      '',
    component: CategoriasPageComponent
  },
  {
    path:      'categoria',
    component: CategoriasPageComponent
  }

];

@NgModule({
  declarations: [CategoriasPageComponent],
  imports: [
    RouterModule.forChild(categoriaRoutes),
    CommonModule,
    MaterialModule
  ],
  providers: [CategoriaService],
  exports: [CategoriasPageComponent]
})
export class CategoriaModule { }
