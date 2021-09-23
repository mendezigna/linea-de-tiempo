import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'categorias',
    pathMatch: 'prefix',
    loadChildren: () =>
    import('./modules/categorias/categoria-module.module').then(m => m.CategoriaModule)
  },
  {
    path: 'lineadetiempo',
    pathMatch: 'prefix',
    loadChildren: () =>
    import('./modules/lineadetiempo/linea-de-tiempo.module').then(m => m.LineaDeTiempoModule)
  },
  { path: '**', redirectTo: '/categorias', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
