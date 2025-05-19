import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserProfile } from '../settings/user.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;

  user: UserProfile = {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    wantsNews: false,
    avatar: '',
  };

  oldPassword: string = '';
  newPassword: string = '';
  isProfileEditing: boolean = false;
  isPasswordChanging: boolean = false;
  feedbackMessage: string = '';
  errorMessage: string = '';

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (userProfile) => {
        this.user = userProfile;
      },
      error: (error) => {
        console.error('Errore durante il recupero del profilo utente:', error);
      },
    });
  }

  showProfileForm() {
    this.isProfileEditing = true;
    this.isPasswordChanging = false;
    this.feedbackMessage = '';
    this.errorMessage = '';
  }

  showChangePassword() {
    this.isProfileEditing = false;
    this.isPasswordChanging = true;
    this.feedbackMessage = '';
    this.errorMessage = '';
  }

  updateProfile() {
    const updatedUserProfile: Partial<UserProfile> = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      birthDate: this.user.birthDate,
      wantsNews: this.user.wantsNews,
      avatar: this.user.avatar,
    };

    this.userService.updateUserProfile(updatedUserProfile).subscribe({
      next: (response) => {
        this.feedbackMessage = 'Profilo aggiornato con successo!';
        this.errorMessage = '';
        (document.getElementById('avatar') as HTMLInputElement).value = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error) => {
        this.feedbackMessage = '';
        this.errorMessage = "Errore durante l'aggiornamento del profilo.";
        console.error('Errore aggiornamento profilo:', error);
      },
    });
  }

  changePassword() {
    this.userService
      .changePassword(this.oldPassword, this.newPassword)
      .subscribe({
        next: (response) => {
          this.feedbackMessage = response.message;
          this.errorMessage = '';
          this.oldPassword = '';
          this.newPassword = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.feedbackMessage = '';
          console.error('Errore cambio password:', error);
        },
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.avatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleTheme(event: any) {
    const dark = event.target.checked;
    document.body.classList.toggle('dark-theme', dark);
  }

  confirmDelete() {
    if (
      confirm(
        'Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile.'
      )
    ) {
      this.userService.deleteAccount().subscribe({
        next: () => {
          this.sharedService.logout();
          alert('Account eliminato con successo.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Errore eliminazione account:', err);
          alert("Errore durante l'eliminazione dell'account.");
        },
      });
    }
  }

  goBack() {
    this.sharedService.goBack();
  }
}
