import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../shared/shared.service';

export interface UserProfile {
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: string;
  wantsNews?: boolean;
  avatar?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:9090/api/v1/user';

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // ✅ Recupera il profilo utente
  getUserProfile(): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(`${this.apiUrl}/profile`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // ✅ Aggiorna il profilo utente
  updateUserProfile(user: UserProfile): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/update`, user, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // ✅ Cambia la password
  changePassword(
    oldPassword: string,
    newPassword: string
  ): Observable<{ message: string }> {
    const changePasswordRequest = {
      currentPassword: oldPassword,
      newPassword: newPassword,
    };

    return this.http
      .post<{ message: string }>(
        `${this.apiUrl}/change_password`,
        changePasswordRequest,
        {
          headers: this.getAuthHeaders(),
        }
      )
      .pipe(catchError(this.handleError));
  }

  // ✅ Elimina account utente
  deleteAccount(): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/delete`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // ⚠️ Gestione errori generica
  private handleError(error: HttpErrorResponse) {
    console.error('Errore:', error);
    return throwError(
      () =>
        error.error?.message || 'Si è verificato un errore. Riprova più tardi.'
    );
  }
}
