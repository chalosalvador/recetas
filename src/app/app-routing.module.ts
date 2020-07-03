import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/loading/loading.module#LoadingPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },

  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'information', loadChildren: './pages/information/information.module#InformationPageModule' },
  { path: 'health-info', loadChildren: './pages/health-info/health-info.module#HealthInfoPageModule' },
  { path: 'start', loadChildren: './pages/start/start.module#StartPageModule' },
  { path: 'recipes', loadChildren: './pages/recipes/recipes.module#RecipesPageModule' },
  { path: 'list-recipes/:type', loadChildren: './pages/list-recipes/list-recipes.module#ListRecipesPageModule' },
  { path: 'operation', loadChildren: './pages/operation/operation.module#OperationPageModule' },
  { path: 'profile/:id', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  {
    path: 'plan-calendar',
    loadChildren: () => import('./modals/plan-calendar/plan-calendar.module').then( m => m.PlanCalendarPageModule)
  },


  // { path: 'loading', loadChildren: './pages/loading/loading.module#LoadingPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
