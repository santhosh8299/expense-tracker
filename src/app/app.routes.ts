import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
        pathMatch: 'full'
    },
    {
        path: 'expenses',
        loadComponent: () => import('./pages/expenses/expenses.component')
    },
    {
        path: 'study',
        loadComponent: () => import('./pages/study/parent/parent.component')
    }
];
