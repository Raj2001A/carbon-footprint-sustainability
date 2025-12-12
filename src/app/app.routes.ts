import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./features/add-emission/add-emission.component').then(m => m.AddEmissionComponent)
  },
  {
    path: 'emissions',
    loadComponent: () =>
      import('./features/emissions-table/emissions-table.component').then(m => m.EmissionsTableComponent)
  },
  {
    path: 'chart',
    loadComponent: () =>
      import('./features/emissions-chart/emissions-chart.component').then(m => m.EmissionsChartComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
