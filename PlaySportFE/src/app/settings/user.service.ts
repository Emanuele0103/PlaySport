import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';

export interface UserProfile {
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api/v1/user';

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  // Aggiorna il profilo dell'utente
  updateUserProfile(user: UserProfile): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put(`${this.apiUrl}/update`, user, { headers }).pipe(
      catchError(this.handleError) // Gestione degli errori
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token non trovato!');
    }

    const headers = { Authorization: `Bearer ${token}` };

    const changePasswordRequest = {
      currentPassword: oldPassword,
      newPassword: newPassword
    };

    return this.http.post<{ message: string }>(`${this.apiUrl}/change_password`, changePasswordRequest, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Recupera il profilo utente
  getUserProfile(): Observable<UserProfile> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`, { headers }).pipe( // Cambia l'endpoint se necessario
      catchError(this.handleError)
    );
  }

  // Gestione degli errori
  private handleError(error: HttpErrorResponse) {
    console.error('Errore:', error);
    return throwError('Si è verificato un errore. Riprova più tardi.');
  }
}
