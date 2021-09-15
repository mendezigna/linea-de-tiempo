import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasPageComponent } from './categorias-page/categorias-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../ui/material.module';
import { CategoriaService } from './categorias-page/categoria.service';
import { CategoriaPageComponent } from './categoria/categoria-page/categoria-page.component';

const categoriaRoutes: Routes = [
  {
    path:      ':categoria',
    component: CategoriaPageComponent
  },
  {
    path:      '',
    component: CategoriasPageComponent
  }

];

@NgModule({
  declarations: [CategoriasPageComponent, CategoriaPageComponent],
  imports: [
    RouterModule.forChild(categoriaRoutes),
    CommonModule,
    MaterialModule
  ],
  providers: [CategoriaService],
  exports: [CategoriasPageComponent, CategoriaPageComponent]
})
export class CategoriaModule { }
