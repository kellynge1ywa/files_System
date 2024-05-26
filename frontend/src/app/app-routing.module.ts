import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { authGuard, loginGuard } from './modules/auth/guard/auth.guard';

const redirectToLogIn = () => redirectUnauthorizedTo(['/auth/login']);
const reDirectToHome = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/components/home/home.component').then(
        (mod) => mod.HomeComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'folders',
    loadChildren: () =>
      import('./modules/files/files.module').then((m) => m.FilesModule),
    canActivate: [authGuard],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [loginGuard],
    // ...canActivate(reDirectToHome),
  },
  {
    path: 'add_folder',
    loadComponent: () =>
      import('./home/components/add-folder/add-folder.component').then(
        (addFolder) => addFolder.AddFolderComponent
      ),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
