import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090/api/v1/user';  

  constructor(private http: HttpClient) { }

  register(signupRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, signupRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, loginRequest);
  }
}
