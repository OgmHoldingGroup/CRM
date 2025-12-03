import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ForgetPasswordComponent },
];
