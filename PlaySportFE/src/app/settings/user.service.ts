import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export interface UserProfile {
  firstname: string;
  lastname: string;
  email: string;
}

export interface Feedback {
  feedback: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api/v1/user'; // Cambia con il tuo endpoint

  constructor(private http: HttpClient, private authService: AuthService) { }

  //Recupera le informazioni dell'utente
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`).pipe(
      catchError(this.handleError));
  }

// Aggiorna il profilo dell'utente
updateUserProfile(user: UserProfile): Observable<any> {
  const token = localStorage.getItem('authToken'); // Ottieni il token direttamente dal localStorage
  const headers = { Authorization: `Bearer ${token}` };
  
  return this.http.put(`${this.apiUrl}/update/${user.email}`, user, { headers }).pipe(
    catchError(this.handleError) // Assicurati di gestire gli errori
  );
}

  // Cambia la password
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, { oldPassword, newPassword }).pipe(
      catchError(this.handleError)
    );
  }

  // Gestione degli errori
  private handleError(error: HttpErrorResponse) {
    // Puoi loggare l'errore o fare ulteriori azioni
    console.error('Si è verificato un errore:', error);
    return throwError('Qualcosa è andato storto; riprova più tardi.');
  }

}
