import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api/v1/user'; // Cambia con il tuo endpoint

  constructor(private http: HttpClient) { }

  // Recupera le informazioni dell'utente
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  // Aggiorna il profilo dell'utente
  updateUserProfile(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, user);
  }

  // Cambia la password
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, { oldPassword, newPassword });
  }

  // Invia feedback
  sendFeedback(feedback: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/feedback`, { feedback });
  }
}
