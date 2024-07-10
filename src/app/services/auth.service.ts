import { Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private injector: Injector,
    private storageService: StorageService,
    public jwtHelper: JwtHelperService
  ) {
    this.isBrowser = isPlatformBrowser(this.injector.get(PLATFORM_ID));
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { email, password }).pipe(
      catchError(this.handleError)
    );
  }

  isLoggedIn(): boolean {
    return this.isBrowser && !!this.storageService.getData('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  decodeToken(token: string): any {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getRole(): string | null {
    const token = this.getToken();
    return token ? this.decodeToken(token)?.role || null : null;
  }

  saveToken(token: string): void {
    if (this.isBrowser) {
      this.storageService.saveData('token', token);
    }
  }

  clearToken(): void {
    if (this.isBrowser) {
      this.storageService.removeData('token');
    }
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email }).pipe(
      catchError(this.handleError)
    );
  }

  private getToken(): string | null {
    return this.isBrowser ? this.storageService.getData('token') : null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
