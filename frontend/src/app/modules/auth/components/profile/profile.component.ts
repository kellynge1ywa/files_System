import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from '@angular/fire/auth';
import { UploadProfileImageService } from '../../services/profile/upload-profile-image.service';
import { concatMap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UsersService } from '../../services/user/users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProfileUser } from '../../interface/user';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    uid: new FormControl(),
    fullname: new FormControl(''),
    displayName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    residence: new FormControl(''),
  });
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private uploadProfileImageService: UploadProfileImageService,
    private toastr: HotToastService,
    private router: Router
  ) {}
  // currentUser$ = this.userService.currentUserProfile$;
  // user$ = this.userService.currentUserProfile$;

  ngOnInit(): void {
    // this.userService.currentUserProfile$
    //   .pipe(untilDestroyed(this))
    //   .subscribe((user) => {
    //     this.profileForm.patchValue({ ...user });
    //   });
  }

  uploadImage(event: any, user: ProfileUser) {
    // this.uploadProfileImageService
    //   .uploadProfileImage(event.target.files[0], `images/profiles/${user.uid}`)
    //   .pipe(
    //     this.toastr.observe({
    //       loading: 'Uploading image...',
    //       success: 'Image uploaded!!!',
    //       error: 'Image upload failed!!!',
    //     }),
    //     concatMap((photoURL) =>
    //       this.userService.updateUser({ uid: user.uid, photoURL })
    //     )
    //   )
    //   .subscribe();
  }

  SaveProfile() {
    const profileData = this.profileForm.value as ProfileUser;

    // this.userService
    //   .updateUser(profileData)
    //   .pipe(
    //     this.toastr.observe({
    //       loading: 'Saving profile...',
    //       success: 'Added profile successfully!!!',
    //       error: 'Failed!!!',
    //     })
    //   )
    //   .subscribe();
  }

  logout() {
    // this.authService
    //   .logout()
    //   .pipe(
    //     this.toastr.observe({
    //       success: 'Logout successfully!!!, Goodbye ',
    //       error: 'Logout failed!!!',
    //       loading: 'Loading',
    //     })
    //   )
    //   .subscribe(() => {
    //     this.router.navigate(['/']);
    //   });
  }
}
