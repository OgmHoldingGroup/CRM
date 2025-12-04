import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AccountingLayoutComponent } from './layouts/accounting-layout/accounting-layout.component';

export const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // ==========================
  // ACCOUNTING LAYOUT
  // ==========================
  {
    path: 'accounting',
    component: AccountingLayoutComponent,
    children: [{ path: 'change-password', component: ForgetPasswordComponent }],
  },
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'users-list', pathMatch: 'full' },

      {
        path: 'users-list',

        loadComponent: () =>
          import('./features/users/components/users/users.component').then(
            (m) => m.UsersComponent
          ),

        title: 'Users List',
      },
    ],
  },

  // fallback
  { path: '**', redirectTo: 'login' },
];
