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
  feedbackMessage: string = '';
  errorMessage: string = '';
  selectedFile: File | null = null;

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
    this.feedbackMessage = '';
    this.errorMessage = '';
  }

  updateProfile() {
    const update = () => {
      const updatedUserProfile: Partial<UserProfile> = {
        email: this.user.email,
        avatar: this.user.avatar, // URL dopo upload
      };

      this.userService.updateUserProfile(updatedUserProfile).subscribe({
        next: () => {
          this.sharedService.updateLocalAvatar(this.user.avatar); // ✅ aggiorna localStorage
          this.feedbackMessage = 'Profilo aggiornato con successo!';
          this.errorMessage = '';
          this.oldPassword = '';
          this.newPassword = '';
          this.selectedFile = null;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (err) => {
          this.feedbackMessage = '';
          this.errorMessage = "Errore durante l'aggiornamento del profilo.";
        },
      });
    };

    if (this.selectedFile) {
      this.userService.uploadUserAvatar(this.selectedFile).subscribe({
        next: (avatarUrl) => {
          this.user.avatar = avatarUrl;
          this.sharedService.updateLocalAvatar(avatarUrl); // ✅ subito dopo upload
          update();
        },
        error: (err) => {
          this.errorMessage = 'Errore durante il caricamento immagine.';
          console.error(err);
        },
      });
    } else {
      update();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.user.avatar = reader.result as string; // anteprima facoltativa
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
