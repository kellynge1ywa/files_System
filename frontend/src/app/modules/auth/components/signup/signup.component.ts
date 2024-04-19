import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { NewUser } from '../../interface/user';
import { StrongPassword } from '../../utils/strong-password';
import { AuthService } from '../../services/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { UsersService } from '../../services/user/users.service';
import { switchMap } from 'rxjs';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  newuser!: NewUser;

  hide = true;
  show = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(StrongPassword),
  ]);
  fullname = new FormControl('', Validators.required);

  errorMessage = '';
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private toastr: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        fullname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(StrongPassword),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: passwordMatchValidator() }
    );
  }

  updateName() {
    if (this.fullname.hasError('required')) {
      this.errorMessage = 'You must enter your name';
    } else {
      this.errorMessage = '';
    }
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.errorMessage = 'Please enter your password';
    } else {
      this.errorMessage = '';
    }
  }

  updateCPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.errorMessage = 'Password do not match';
    } else {
      this.errorMessage = '';
    }
  }
  onRegister() {
    if (!this.signupForm.valid) {
      return;
    }

    const { fullname, email, password } = this.signupForm.value;
    this.authService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.userService.addUser({ uid, email, displayName: fullname })
        ),
        // switchMap(() => this.authService.sendVerificationEmail({ email })),
        this.toastr.observe({
          success:
            'Registration successful,Check email for verification link, Welcome!!!',
          error: 'Registration failed, try again',
          loading: 'Loading!!!',
          // error:((message))=>`${message}`
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  // onRegister() {
  //   if (this.signupForm.valid) {
  //     const { email } = this.signupForm.value;
  //     const { password } = this.signupForm.value;

  //     this.authService.register({ email, password });
  //   }
  // }
}
