import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit {
  @ViewChild('signupBtn') signupBtn!: ElementRef;
  @ViewChild('signinBtn') signinBtn!: ElementRef;
  @ViewChild('mainContainer') mainContainer!: ElementRef;

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.signupBtn.nativeElement.addEventListener("click", () => {
      this.toggleContainerClass();
    });
    this.signinBtn.nativeElement.addEventListener("click", () => {
      this.toggleContainerClass();
    });
  }

  toggleContainerClass(): void {
    this.mainContainer.nativeElement.classList.toggle("change");
  }

  login(email: string, password: string): void {
    this.authService.login({ email, password }).subscribe(response => {
      console.log('Login successful', response);
    }, error => {
      console.error('Login failed', error);
    });
  }
}
