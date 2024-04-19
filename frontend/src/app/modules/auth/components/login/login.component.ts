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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private toastr: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
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

  onLogin() {
    if (this.loginform.valid) {
      const { email, password } = this.loginform.value;
      this.authService.login(email, password);
    }
  }

  onSubmit() {
    if (!this.loginform.valid) {
      return;
    }
    const { email, password } = this.loginform.value;
    this.authService
      .signIn(email, password)
      .pipe(
        this.toastr.observe({
          success: 'You have logged in successfully!!!',
          loading: 'logging in....',
          error: 'Log in failed!!!',
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
        // console.log('Karibu!!');
      });
  }
}
