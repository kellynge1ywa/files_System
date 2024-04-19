import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const reDirectToHome = () => redirectLoggedInTo(['/']);
const redirectToLogIn = () => redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (login) => login.LoginComponent
      ),
    ...canActivate(reDirectToHome),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup.component').then(
        (signup) => signup.SignupComponent
      ),
    ...canActivate(reDirectToHome),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (profile) => profile.ProfileComponent
      ),
    ...canActivate(redirectToLogIn),
  },
  {
    path: 'reset_password',
    loadComponent: () =>
      import('./components/forgot-password/forgot-password.component').then(
        (resetPassword) => resetPassword.ForgotPasswordComponent
      ),
  },
  {
    path: 'verify_email',
    loadComponent: () =>
      import('./components/verify-email/verify-email.component').then(
        (verifyEmail) => verifyEmail.VerifyEmailComponent
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
