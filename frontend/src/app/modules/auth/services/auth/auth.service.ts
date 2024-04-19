import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
  UserInfo,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from '../../../../../firebase.config';
import 'firebase/auth';
import firebase from 'firebase/app';
import {
  AppUser,
  LoginCredentials,
  NewUser,
  ProfileUser,
} from '../../interface/user';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: ProfileUser | null;

  constructor(
    private router: Router,
    private authy: Auth,
    private toastr: ToastrService
  ) {
    this.currentUser = null;
  }

  loggedinUser$ = authState(this.authy);

  //login
  login(email: string, password: string) {
    auth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/files/files']);
        this.toastr.success('Login successfully!!!', 'Success');
      },
      (error) => {
        // alert(error.message);
        this.toastr.error(error.message, 'Error');
      }
    );
  }

  //register
  register(newuser: NewUser) {
    auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(
      () => {
        alert('Registration successfull!!');
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        alert(error.message);
        this.router.navigate(['/']);
      }
    );
  }

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.authy, email, password));
  }

  // signUp(fullname: string, email: string, password: string) {
  //   return from(
  //     createUserWithEmailAndPassword(this.authy, email, password)
  //   ).pipe(
  //     switchMap(({ user }) => updateProfile(user, { displayName: fullname }))
  //   );
  // }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.authy.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not authenticated');

        return updateProfile(user, profileData);
      })
    );
  }

  //logout
  // logout() {
  //   auth.signOut().then(() => {
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/']);
  //   });
  // }

  signIn(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.authy, email, password));
  }

  resetPassword(email: string) {
    // auth.sendPasswordResetEmail(email);
    return from(sendPasswordResetEmail(this.authy, email));
  }

  sendVerificationEmail(user: any): Observable<any> {
    return from(this.sendVerificationEmail(user));
  }

  getCurrentUser() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        let email = user.email;
        console.log(uid);
        console.log(email);
      }
    });
  }

  logout() {
    return from(this.authy.signOut());
  }
}
