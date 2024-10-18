import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; // Servizio di autenticazione
import { UserService } from '../settings/user.service'; // Servizio utente per aggiornare profilo e password

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{

  showOldPassword: boolean = false;
  showNewPassword: boolean = false;

  user: any = {
    firstname: '',
    lastname: '',
    email: ''
  };
  oldPassword: string = '';
  newPassword: string = '';
  isProfileEditing: boolean = false;
  isPasswordChanging: boolean = false;
  feedbackMessage: string = ''; 

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }
  
  ngOnInit(): void {
    this.loadUserProfile(); // Chiama il metodo per caricare il profilo
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
    this.userService.updateUserProfile(this.user).subscribe({
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
        this.feedbackMessage = 'Password cambiata con successo!';
        console.log("Password cambiata:", response);
      },
      error: (error) => {
        this.feedbackMessage = 'Errore durante il cambio password.';
        console.error('Errore cambio password:', error);
      }
    });
  }

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

  goBack() {
    this.router.navigate(['/home']); 
  }
  
}
