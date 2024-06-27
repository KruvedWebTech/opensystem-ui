import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('/auth/login', { username: this.username, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.errorMessage = 'Login failed'
      });
  }
}
