import { Component } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css', '../../../styles.css']  
})
export class LoginComponent {
  
  loginForm: FormGroup;  // Dichiarazione del form di login
  errorMessage: string;  // Variabile per memorizzare e visualizzare eventuali messaggi di errore


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    // Inizializzazione del form con i campi 'email' e 'password' e relative regole di validazione
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required]]
    });
  }

  // Funzione chiamata quando il form di login viene inviato
  onSubmit(): void {
    if (this.loginForm.valid) {  // Verifica che il form sia valido
      // Chiama il servizio di autenticazione per eseguire il login
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {  // Successo nel login
          console.log('Login response:', data);  // Stampa i dati di risposta del login nella console (per debug)

          // Salva il token di autenticazione e altri dati dell'utente nel localStorage per gestire la sessione
          localStorage.setItem('authToken', data.token);  
          localStorage.setItem('firstname', data.firstname);
          localStorage.setItem('lastname', data.lastname);

          // Reindirizza l'utente alla home page
          this.router.navigate(['/home']);
        },
        error: (err) => {  // Errore nel login
          console.error('Login error:', err);  // Stampa l'errore nella console (per debug)
          // Imposta il messaggio di errore per l'utente (ad esempio, credenziali errate)
          this.errorMessage = err.error?.message || 'Utente non esistente o password errata';  
        }
      });
    } else {
      console.log('Form non valido');  // Se il form non è valido, lo stampa nella console
    }
  }
}
