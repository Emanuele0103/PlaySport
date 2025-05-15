import { Component } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { AuthService } from '../auth.service';  
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-register', 
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.css', '../../../styles.css'] 
})
export class RegisterComponent {
  
  signupForm: FormGroup;  // Proprietà che rappresenta il form di registrazione

  // Costruttore in cui si iniettano i servizi necessari al componente
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    
    // Inizializzazione del form con i campi necessari, applicando validazioni sui dati inseriti
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],  // Campo 'firstname' richiesto, minimo 2 caratteri
      lastname: ['', [Validators.required, Validators.minLength(2)]],   // Campo 'lastname' richiesto, minimo 2 caratteri
      email: ['', [Validators.required, Validators.email]],  // Campo 'email' richiesto, validazione sull'email
      password: ['', [Validators.required, Validators.minLength(6)]]  // Campo 'password' richiesto, minimo 6 caratteri
    });
  }

  // Funzione che viene chiamata quando si invia il form di registrazione
  onSubmit(): void {
    if (this.signupForm.valid) {  // Verifica se il form è valido secondo le regole di validazione
      // Chiama il servizio di autenticazione per registrare un nuovo utente
      this.authService.register(this.signupForm.value).subscribe({
        next: data => {
          console.log('Registrazione completata con successo!', data);  // Mostra un messaggio di successo nella console
          this.router.navigate(['/login']);  // Reindirizza l'utente alla pagina di login dopo la registrazione
        },
        error: err => {
          console.error('Errore durante la registrazione:', err);  // Stampa un messaggio di errore se la registrazione fallisce
        }
      });
    } else {
      console.log('Form non valido');  // Messaggio nella console se il form non passa la validazione
    }
  }
}
