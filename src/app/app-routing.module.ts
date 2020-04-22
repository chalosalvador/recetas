import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/loading/loading.module#LoadingPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  { path: 'information', loadChildren: './pages/information/information.module#InformationPageModule' },
  { path: 'health-info', loadChildren: './pages/health-info/health-info.module#HealthInfoPageModule' },
  { path: 'start', loadChildren: './pages/start/start.module#StartPageModule' },
  
  // { path: 'loading', loadChildren: './pages/loading/loading.module#LoadingPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
