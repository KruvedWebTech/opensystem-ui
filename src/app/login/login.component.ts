import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { Constants } from '../../Helpers/constants';
import { Routes } from '../../Helpers/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  loginError: string | null = null; // Variable to store login error
  envname: string = environment.envName;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Constants.PATTERN_EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(6)]] // Adjusted to 6 for easier testing
    });
  }

  get formControls() { return this.loginForm.controls; }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  login(): void {
    this.loginError = null; // Reset login error
    if (this.loginForm.invalid) {
      console.log('Form is invalid:', this.loginForm);
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response: any) => {
        console.log('Login response:', response); // Log the response for debugging
        if (response && response.success) {
          this.authService.saveToken(response.data); // Use AuthService method to save token
          const tokenPayload = this.authService.decodeToken(response.data);
          console.log('Decoded Token Payload:', tokenPayload); // Log the decoded token payload for debugging
          if (tokenPayload.role === 'Admin') {
            this.router.navigate([Routes.ADMIN]);
          } else if (tokenPayload && tokenPayload.role === 'User') {
            this.router.navigate([Routes.USER]);
          } else {
            this.loginError = Constants.ERROR_MESSAGES.INVALID_ROLE;
          }
        } else {
          this.loginError = Constants.ERROR_MESSAGES.INVALID_RESPONSE;
        }
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        this.loginError = Constants.ERROR_MESSAGES.LOGIN_FAILED;
      }
    });
  }

  navigateToForgotPassword(): void {
    this.router.navigate([Routes.FORGOT_PASSWORD]);
  }
}
