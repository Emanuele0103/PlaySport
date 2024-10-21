import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; // Servizio di autenticazione
import { UserService, UserProfile } from '../settings/user.service'; // Servizio utente per aggiornare profilo e password

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  showOldPassword: boolean = false;
  showNewPassword: boolean = false;

  user: UserProfile = {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: ''
  };

  oldPassword: string = '';
  newPassword: string = '';
  isProfileEditing: boolean = false;
  isPasswordChanging: boolean = false;
  feedbackMessage: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserProfile(); // Chiama il metodo per caricare il profilo
  }

  // Funzione per caricare il profilo utente
  loadUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (userProfile) => {
        this.user = userProfile; // Imposta l'oggetto utente
      },
      error: (error) => {
        console.error('Errore durante il recupero del profilo utente:', error);
      }
    });
  }

  // Mostra il modulo per modificare il profilo
  showProfileForm() {
    this.isProfileEditing = true;
    this.isPasswordChanging = false;
    this.feedbackMessage = '';
  }

  // Mostra il modulo per cambiare la password
  showChangePassword() {
    this.isProfileEditing = false;
    this.isPasswordChanging = true;
    this.feedbackMessage = '';
  }

  // Funzione per aggiornare il profilo utente
  updateProfile() {
    // Crea un oggetto per il profilo da inviare, includendo solo i campi modificati
    const updatedUserProfile: Partial<UserProfile> = {};

    // Verifica quali campi sono stati effettivamente modificati
    if (this.user.firstname) {
      updatedUserProfile.firstname = this.user.firstname;
    }
    if (this.user.lastname) {
      updatedUserProfile.lastname = this.user.lastname;
    }
    if (this.user.email) {
      updatedUserProfile.email = this.user.email;
    }
    if (this.user.phoneNumber) {
      updatedUserProfile.phoneNumber = this.user.phoneNumber;
    }

    // Invia solo i campi modificati
    this.userService.updateUserProfile(updatedUserProfile).subscribe({
      next: (response) => {
        this.feedbackMessage = 'Profilo aggiornato con successo!';
        console.log("Profilo aggiornato:", response);
      },
      error: (error) => {
        this.feedbackMessage = 'Errore durante l\'aggiornamento del profilo.';
        console.error('Errore aggiornamento profilo:', error);
      }
    });
  }


  // Funzione per cambiare la password
  changePassword() {
    this.userService.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: (response) => {
        this.feedbackMessage = response.message; // Accesso al messaggio JSON
        this.errorMessage = ''; // Resetta eventuali messaggi di errore
        console.log("Password cambiata:", response.message);
      },
      error: (error) => {
        // Gestisci l'errore
        this.errorMessage = error.error.message; // Accesso al messaggio JSON di errore
        this.feedbackMessage = ''; // Resetta il messaggio di feedback in caso di errore
        console.error('Errore cambio password:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
