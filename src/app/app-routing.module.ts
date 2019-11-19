import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './loading/loading.module#LoadingPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  { path: 'loading', loadChildren: './loading/loading.module#LoadingPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
