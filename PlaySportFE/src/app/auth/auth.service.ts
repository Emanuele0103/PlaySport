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
  providedIn: 'root'  // Questo servizio è disponibile in tutta l'applicazione (fornito a livello di root)
})

export class AuthService {
  private baseUrl = 'http://localhost:9090/api/v1/user';  // URL base per le chiamate API

  // `BehaviorSubject` traccia lo stato dell'utente. Inizia con `null` (nessun utente autenticato)
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  // `user$` è l'osservabile che altri componenti possono sottoscrivere per sapere se l'utente è autenticato
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // Funzione di registrazione: invia i dati di registrazione all'API
  register(signupRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, signupRequest);  // Chiamata POST per registrare un nuovo utente
  }

  // Funzione di login: invia i dati di login e riceve un token JWT
  login(loginRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authenticate`, loginRequest).pipe(
      tap((response: any) => {  // Se la risposta è corretta, gestisce il token JWT
        if (response.token) {
          // Salva il token nel localStorage
          localStorage.setItem('authToken', response.token);

          // Decodifica il token per ottenere le informazioni dell'utente
          const decodedToken = this.getDecodedToken();

          // Aggiorna il `BehaviorSubject` con i dati dell'utente decodificato
          this.userSubject.next(decodedToken);  // Aggiorna lo stato dell'utente
        }
      }),
      catchError((error) => {  // Gestisce gli errori in caso di login fallito
        console.error('Errore durante il login:', error);
        return throwError(error);  // Propaga l'errore
      })
    );
  }

  // Funzione per decodificare il token JWT e ottenere i dati dell'utente
  getDecodedToken(): User | null {
    const token = localStorage.getItem('authToken');  // Recupera il token dal localStorage
    if (token) {
      try {
        // Decodifica il token JWT
        const decoded: any = jwtDecode(token);

        // Restituisce i dati dell'utente decodificato (nome, cognome, ruolo)
        return {
          firstname: decoded.firstname || 'Utente',  // Usa "Utente" come nome predefinito se non presente
          lastname: decoded.lastname || 'sconosciuto',  // Usa "sconosciuto" come cognome predefinito se non presente
          role: decoded.role || 'user',  // Imposta "user" come ruolo predefinito se non presente
        };
      } catch (error) {
        console.error('Errore nella decodifica del token:', error);  // Gestisce eventuali errori di decodifica
      }
    }
    return null;  // Se non c'è token o non può essere decodificato, restituisce `null`
  }

  // Verifica se l'utente è autenticato (controlla la presenza del token nel localStorage)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token != null;  // Restituisce `true` se il token esiste, altrimenti `false`
  }

  // Verifica se l'utente ha il ruolo di admin (controlla il valore dell'utente nel BehaviorSubject)
  isAdmin(): boolean {
    const user = this.userSubject.value;  // Ottiene lo stato attuale dell'utente
    return user && user.role === 'ADMIN';  // Restituisce `true` se l'utente è admin, altrimenti `false`
  }

  // Funzione di logout: rimuove il token e resetta lo stato dell'utente
  logout(): void {
    localStorage.removeItem('authToken');  // Rimuove il token JWT dal localStorage
    this.userSubject.next(null);  // Imposta lo stato dell'utente su `null` (nessun utente autenticato)
    this.router.navigate(['/login']);  // Reindirizza l'utente alla pagina di login
  }
}
