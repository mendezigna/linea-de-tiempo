import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'categories',
    pathMatch: 'prefix',
    loadChildren: () =>
    import('./modules/categories/category-module.module').then(m => m.CategoryModule)
  },
  {
    path: 'timeline',
    pathMatch: 'prefix',
    loadChildren: () =>
    import('./modules/timeline/timeline.module').then(m => m.TimelineModule)
  },
  { path: '**', redirectTo: '/categories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
