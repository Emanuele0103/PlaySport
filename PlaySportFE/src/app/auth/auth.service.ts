import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090/api/v1/user';  
  
  private userSubject: BehaviorSubject<{ firstname: string | null; lastname: string | null } | null> = new BehaviorSubject(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(signupRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, signupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, loginRequest).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.userSubject.next({ firstname: response.firstname, lastname: response.lastname });
        }
      }),
      catchError((error) => {
        console.error('Errore durante il login:', error);
        return throwError(error);
      })
    );
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('authToken');
    if (token) {
        const decoded: any = jwtDecode(token);
        return {
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            email: decoded.sub,
        };
    }
    return null;
}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token != null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.userSubject.next(null); 
  }
}
