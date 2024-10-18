import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

// Definisci un'interfaccia per rappresentare l'utente
interface User {
  firstname: string;
  lastname: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090/api/v1/user';  

  // Comportamento soggetto per tracciare l'utente
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public user$ = this.userSubject.asObservable(); // Utilizza direttamente userSubject come user$

  constructor(private http: HttpClient, private router: Router) { }

  // Funzione di registrazione
  register(signupRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, signupRequest);
  }

  // Funzione di login
  login(loginRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, loginRequest).pipe(
      tap((response: any) => {
        if (response.token) {
          // Salva il token nel localStorage
          localStorage.setItem('authToken', response.token);

          // Decodifica il token per ottenere informazioni sull'utente
          const decodedToken = this.getDecodedToken();

          // Aggiorna il BehaviorSubject con le informazioni dell'utente decodificato
          this.userSubject.next(decodedToken); // Aggiorna direttamente con il token decodificato
        }
      }),
      catchError((error) => {
        console.error('Errore durante il login:', error);
        return throwError(error);
      })
    );
  }

  // Funzione per decodificare il token JWT
  getDecodedToken(): User {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // Decodifica il token JWT
        const decoded: any = jwtDecode(token);

        // Restituisci il contenuto decodificato (incluse tutte le proprietà come firstname, lastname e role)
        return {
          firstname: decoded.firstname || 'Utente',
          lastname: decoded.lastname || 'sconosciuto',
          role: decoded.role || 'user', // Fornisce un ruolo predefinito se non presente
        };
      } catch (error) {
        console.error('Errore nella decodifica del token:', error);
      }
    }
    return null;
  }

  // Verifica se l'utente è autenticato
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token != null;
  }

  // Verifica se l'utente ha il ruolo di admin
  isAdmin(): boolean {
    const user = this.userSubject.value; 
    return user && user.role === 'ADMIN'; 
  }

  // Funzione di logout
  logout(): void {
    localStorage.removeItem('authToken');  
    this.userSubject.next(null);  // Imposta l'utente a null
    this.router.navigate(['/login']);  
  }
}
