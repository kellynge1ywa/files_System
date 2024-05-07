import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ProfileUser, ResetPassword } from '../../interface/user';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: HotToastService
  ) {}

  ResetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {}

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  ResetPassword() {
    // if (!this.ResetPasswordForm.valid) {
    //   return;
    // }
    // const { email } = this.ResetPasswordForm.value as ResetPassword;
    // this.authService
    //   .resetPassword(email)
    //   .pipe(
    //     this.toastr.observe({
    //       loading: 'Sending reset password link...',
    //       error: 'Sending reset password link failed!!!',
    //       success: 'Reset password link sent!!!',
    //     })
    //   )
    //   .subscribe(() => {
    //     this.router.navigate(['/auth/verify_email']);
    //   });
  }
}
