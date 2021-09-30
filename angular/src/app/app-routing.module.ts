import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './modules/error-page/error-page.component';
import { HomePageComponent } from './modules/home-page/home-page.component';

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
  {
    path: 'error',
    pathMatch: 'full',
    component: ErrorPageComponent
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomePageComponent
  },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
