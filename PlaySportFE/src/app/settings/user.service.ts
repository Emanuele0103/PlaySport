import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
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

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getAuthHeaders(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        return new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
      }
    }

    // Se non siamo nel browser o il token non esiste, restituisco intestazioni vuote
    return new HttpHeaders();
  }

  private getCurrentUserId(): string | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id?.toString() || null;
    } catch (error) {
      console.error('Errore nel decoding del token JWT:', error);
      return null;
    }
  }

  uploadUserAvatar(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.apiUrl}/users/${this.getCurrentUserId()}/avatar`,
      formData,
      {
        headers: this.getAuthHeaders(),
        responseType: 'text',
      }
    );
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(`${this.apiUrl}/profile`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  updateUserProfile(user: UserProfile): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/update`, user, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

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

  deleteAccount(): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/delete`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Errore:', error);
    return throwError(
      () =>
        error.error?.message || 'Si è verificato un errore. Riprova più tardi.'
    );
  }
}
