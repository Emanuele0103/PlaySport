import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
  
  user: { firstname: string | null; lastname: string | null } | null = null;
  router: any;

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  get userName(): string {
    return this.user ? `${this.user.firstname} ${this.user.lastname}` : 'Utente sconosciuto'; 
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
