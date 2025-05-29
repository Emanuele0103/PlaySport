import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  fieldData: { id: any; name: string; sport: string; pricePerHour: number };
  errorMessage: string;
  feedbackMessage: string;

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/home']);
  }

  resetForm(): void {
    this.fieldData = {
      id: null,
      name: '',
      sport: '',
      pricePerHour: 0,
    };
    this.errorMessage = '';
    this.feedbackMessage = '';
  }

  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    // Puoi anche reindirizzare alla login se vuoi, oppure lasciare che lo faccia il componente
  }

  updateLocalAvatar(avatarUrl: string) {
    if (avatarUrl) {
      localStorage.setItem('avatar', avatarUrl);
    }
  }
}
