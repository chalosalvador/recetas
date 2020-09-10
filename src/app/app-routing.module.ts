import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService  } from './services/auth-guard.service';

const routes: Routes = [
  {path: '',redirectTo:"login",pathMatch:"full"},
  { path: '', loadChildren: './pages/loading/loading.module#LoadingPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule',canActivate: [AuthGuardService] },
  { path: 'information', loadChildren: './pages/information/information.module#InformationPageModule',canActivate: [AuthGuardService] },
  { path: 'health-info', loadChildren: './pages/health-info/health-info.module#HealthInfoPageModule',canActivate: [AuthGuardService] },
  { path: 'start', loadChildren: './pages/start/start.module#StartPageModule',canActivate: [AuthGuardService] },
  { path: 'recipes', loadChildren: './pages/recipes/recipes.module#RecipesPageModule',canActivate: [AuthGuardService] },
  { path: 'list-recipes/:type', loadChildren: './pages/list-recipes/list-recipes.module#ListRecipesPageModule',canActivate: [AuthGuardService] },
  { path: 'operation', loadChildren: './pages/operation/operation.module#OperationPageModule',canActivate: [AuthGuardService] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule',canActivate: [AuthGuardService] },
  {
    path: 'plan-calendar',
    loadChildren: () => import('./modals/plan-calendar/plan-calendar.module').then( m => m.PlanCalendarPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./modals/statistics/statistics.module').then( m => m.StatisticsPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./modals/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'detail-planning',
    loadChildren: () => import('./modals/detail-planning/detail-planning.module').then( m => m.DetailPlanningPageModule)
  },
  {
    path: 'plan-options',
    loadChildren: () => import('./popover/plan-options/plan-options.module').then( m => m.PlanOptionsPageModule)
  },
  {
    path: 'developed',
    loadChildren: () => import('./pages/developed/developed.module').then( m => m.DevelopedPageModule)
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
