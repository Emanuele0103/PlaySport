import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; // Assicurati di avere il servizio di autenticazione

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  user: any = {
    firstname: '',
    lastname: '',
    email: ''
  };
  oldPassword: string = '';
  newPassword: string = '';
  isProfileEditing: boolean = false;
  isPasswordChanging: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  // Mostra il modulo per modificare il profilo
  showProfileForm() {
    this.isProfileEditing = true;
    this.isPasswordChanging = false;
  }

  // Mostra il modulo per cambiare la password
  showChangePassword() {
    this.isProfileEditing = false;
    this.isPasswordChanging = true;
  }

  // Funzione per aggiornare il profilo utente
  updateProfile() {
    // Implementa la logica per aggiornare il profilo nel database
    console.log("Profilo aggiornato:", this.user);
    // Esegui una chiamata al servizio per salvare i dati nel DB
  }

  // Funzione per cambiare la password
  changePassword() {
    // Implementa la logica per cambiare la password nel database
    console.log("Cambiata password da:", this.oldPassword, "a:", this.newPassword);
    // Esegui una chiamata al servizio per cambiare la password nel DB
  }

  // Funzione di logout
  logout() {
    this.authService.logout(); 
    this.router.navigate(['/home']); 
  }

  goBack() {
    this.router.navigate(['/home']); 
  }
}
