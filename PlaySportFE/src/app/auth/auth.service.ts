import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

// Definisci un'interfaccia per rappresentare l'utente
interface User {
  firstname: string;
  lastname: string;
  role: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root', // Questo servizio è disponibile in tutta l'applicazione (fornito a livello di root)
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl + '/api/v1/user';
  // URL base per le chiamate API

  // `BehaviorSubject` traccia lo stato dell'utente. Inizia con `null` (nessun utente autenticato)
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  // `user$` è l'osservabile che altri componenti possono sottoscrivere per sapere se l'utente è autenticato
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Funzione di registrazione: invia i dati di registrazione all'API
  register(formData: any): Observable<any> {
    return this.http.post(
      'http://localhost:9090/api/v1/user/register',
      formData
    ); // Chiamata POST per registrare un nuovo utente
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, loginRequest).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          const decodedToken = this.getDecodedToken();
          this.userSubject.next(decodedToken);

          // Salva il ruolo nel localStorage
          localStorage.setItem('role', decodedToken.role);
        }
      }),
      catchError((error) => {
        console.error('Errore durante il login:', error);
        return throwError(error);
      })
    );
  }

  getDecodedToken(): User {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('🔍 [Token Decodificato]', decoded);

        return {
          firstname: decoded.firstname,
          lastname: decoded.lastname,
          role: decoded.role,
          avatar: decoded.avatarUrl || null,
        };
      } catch (error) {
        console.error('Errore nella decodifica del token:', error);
      }
    }
    return null;
  }

  // Verifica se l'utente è autenticato (controlla la presenza del token nel localStorage)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token != null; // Restituisce `true` se il token esiste, altrimenti `false`
  }

  // Verifica se l'utente ha il ruolo di admin (controlla il valore dell'utente nel BehaviorSubject)
  isAdmin(): boolean {
    const user = this.userSubject.value; // Ottiene lo stato attuale dell'utente
    return user && user.role === 'ADMIN'; // Restituisce `true` se l'utente è admin, altrimenti `false`
  }

  // Funzione di logout: rimuove il token e resetta lo stato dell'utente
  logout(): void {
    localStorage.removeItem('authToken'); // Rimuove il token JWT dal localStorage
    this.userSubject.next(null); // Imposta lo stato dell'utente su `null` (nessun utente autenticato)
    this.router.navigate(['/login']); // Reindirizza l'utente alla pagina di login
  }
}
