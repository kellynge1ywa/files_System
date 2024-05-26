import { inject, Injectable, signal } from '@angular/core';

// import { auth } from '../../../../../firebase.config';
import 'firebase/auth';
import firebase from 'firebase/app';
import {
  AppUser,
  LoginCredentials,
  NewUser,
  ProfileUser,
  RegisterUser,
  ResponseDto,
  UserResponseDto,
} from '../../interface/user';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  EMPTY,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private currentUser: ProfileUser | null;
  private jwtHelper = new JwtHelperService();
  router = inject(Router);

  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public user$: BehaviorSubject<AppUser | undefined> = new BehaviorSubject<
    AppUser | undefined
  >(undefined);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  baseUrl = 'https://localhost:7282/api/Users';

  constructor(private http: HttpClient, private toastr: ToastrService) {
    // this.currentUser = null;
    // this.checkToken();
  }

  // loggedinUser$ = authState(this.authy);
  currentUserSignal = signal<UserResponseDto | undefined | null>(undefined);

  register(data: RegisterUser) {
    return this.http
      .post<{ result: UserResponseDto }>(`${this.baseUrl}/Register`, data)
      .pipe(
        tap((result) => {
          localStorage.setItem('token', result.result.token);
          this.currentUserSignal.set(result.result);
        })
      );
  }

  setUser(user?: AppUser) {
    this.user$.next(user);
    this.isLoggedInSubject.next(!!user);
  }

  login(data: LoginCredentials) {
    return this.http
      .post<{ result: UserResponseDto }>(`${this.baseUrl}/login`, data)
      .pipe(
        tap((result) => {
          this.setUser(result.result.userDto);
          localStorage.setItem('token', result.result.token);
          // this.router.navigate(['/']);
        })
      );
  }

  getLoggedInUser() {
    const token = localStorage.getItem('token') ?? '';
    return this.http
      .get<{ result: UserResponseDto }>(
        'https://localhost:7161/api/Folders/loggedInUser',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(
        tap(console.log),
        tap((res) => this.isLoggedInSubject.next(!!res?.result)),
        map((res) => res.result),
        catchError(() => of(EMPTY))
      );
  }

  // login(data: LoginCredentials) {
  //   return this.http
  //     .post<{ result: LoginResponseDto }>(`${this.baseUrl}/login`, data)
  //     .subscribe((res) => {
  //       localStorage.setItem('token', res.result.token);
  //     });
  // }

  isLoggedIn(): Observable<boolean> {
    // return localStorage.getItem('token') !== null;
    return this.isLoggedInSubject.asObservable();
  }
  getIsLoggedIn() {
    return this.isLoggedInSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.setUser(undefined);
  }

  private checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists during app startup, clear it
      localStorage.removeItem('token');
      this.isLoggedInSubject.next(false);
    }
  }

  //login
  // login(email: string, password: string) {
  //   auth.signInWithEmailAndPassword(email, password).then(
  //     () => {
  //       localStorage.setItem('token', 'true');
  //       this.router.navigate(['/files/files']);
  //       this.toastr.success('Login successfully!!!', 'Success');
  //     },
  //     (error) => {
  //       // alert(error.message);
  //       this.toastr.error(error.message, 'Error');
  //     }
  //   );
  // }

  // signUp(email: string, password: string) {
  //   return from(createUserWithEmailAndPassword(this.authy, email, password));
  // }

  // signUp(fullname: string, email: string, password: string) {
  //   return from(
  //     createUserWithEmailAndPassword(this.authy, email, password)
  //   ).pipe(
  //     switchMap(({ user }) => updateProfile(user, { displayName: fullname }))
  //   );
  // }

  // updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
  //   const user = this.authy.currentUser;
  //   return of(user).pipe(
  //     concatMap((user) => {
  //       if (!user) throw new Error('Not authenticated');

  //       return updateProfile(user, profileData);
  //     })
  //   );
  // }

  //logout
  // logout() {
  //   auth.signOut().then(() => {
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/']);
  //   });
  // }

  // signIn(email: string, password: string) {
  //   return from(signInWithEmailAndPassword(this.authy, email, password));
  // }

  // resetPassword(email: string) {
  //   // auth.sendPasswordResetEmail(email);
  //   return from(sendPasswordResetEmail(this.authy, email));
  // }

  // sendVerificationEmail(user: any): Observable<any> {
  //   return from(this.sendVerificationEmail(user));
  // }

  // getCurrentUser() {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       let uid = user.uid;
  //       let email = user.email;
  //       console.log(uid);
  //       console.log(email);
  //     }
  //   });
  // }

  // logout() {
  //   return from(this.authy.signOut());
  // }
}
