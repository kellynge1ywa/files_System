import { Injectable } from '@angular/core';

import { ProfileUser } from '../../interface/user';
import { from, Observable, of, retry, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // get currentUserProfile$(): Observable<ProfileUser | null> {
  //   return this.authService.loggedinUser$.pipe(
  //     switchMap((user) => {
  //       if (!user?.uid) {
  //         return of(null);
  //       }
  //       const ref = doc(this.firestore, 'users', user.uid);
  //       return docData(ref) as Observable<ProfileUser>;
  //     })
  //   );
  // }

  constructor(private authService: AuthService) {}

  // addUser(user: ProfileUser): Observable<any> {
  //   const ref = doc(this.firestore, 'users', user.uid);
  //   return from(setDoc(ref, user));
  // }

  // updateUser(user: ProfileUser): Observable<any> {
  //   const ref = doc(this.firestore, 'users', user.uid);
  //   return from(updateDoc(ref, { ...user }));
  // }
}
