import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ErrorPageComponent } from './modules/error-page/error-page.component';

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
    path: 'user',
    pathMatch: 'prefix',
    loadChildren: () =>
    import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'auth',
    pathMatch: 'prefix',
    loadChildren: () =>
    import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    pathMatch: 'prefix',
    loadChildren: () =>
    import('./modules/home-page/home-module.module').then(m => m.HomeModule)
  },
  {
    path: 'error',
    pathMatch: 'full',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
