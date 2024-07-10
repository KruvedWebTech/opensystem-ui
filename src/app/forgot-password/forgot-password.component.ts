import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword() {
    if (!this.email) {
      return;
    }

    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        // Handle successful password reset request
        console.log('Password reset email sent:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Password reset failed:', error);
      }
    );
  }
}/***/
