import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface Campo {
  name: string;
  address: string;
  img: string;
}

interface User {
  firstname: string;
  lastname: string;
  role: string | null;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$: User;
  selectedSport: string = '';
  campi: Campo[] = [];
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User) => {
      if (user) {
        this.user$ = user;
        this.isAdmin = this.authService.isAdmin();
      } else {
        this.recuperaUtenteDaLocalStorage();
      }
    });
  }

  recuperaUtenteDaLocalStorage(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const firstname = localStorage.getItem('firstname') || 'Utente';
      const lastname = localStorage.getItem('lastname') || 'Sconosciuto';
      this.user$ = { firstname, lastname, role: null };
    } else {
      this.user$ = { firstname: 'Utente', lastname: 'Sconosciuto', role: null };
    }
  }

  get userName(): string {
    return this.user$ ? `${this.user$.firstname} ${this.user$.lastname}` : 'Utente sconosciuto';
  }

  selectSport(sport: string): void {
    this.selectedSport = sport;
    this.getFieldForSport(sport);
  }

  getFieldForSport(sport: string): void {
    const campiDisponibili: { [key: string]: Campo[] } = {
      calcio: [
        { name: 'Campo Calcio 1', address: 'Via Roma', img: 'calcio1.jpg' },
        { name: 'Campo Calcio 2', address: 'Via Milano', img: 'calcio2.jpg' }
      ],
      padel: [
        { name: 'Campo Padel 1', address: 'Via Napoli', img: 'padel1.jpg' },
        { name: 'Campo Padel 2', address: 'Via Firenze', img: 'padel2.jpg' }
      ],
      tennis: [
        { name: 'Campo Tennis 1', address: 'Via Torino', img: 'tennis1.jpg' },
        { name: 'Campo Tennis 2', address: 'Via Bologna', img: 'tennis2.jpg' }
      ],
      basket: [
        { name: 'Campo Basket 1', address: 'Via Palermo', img: 'basket1.jpg' },
        { name: 'Campo Basket 2', address: 'Via Genova', img: 'basket2.jpg' }
      ]
    };

    this.campi = campiDisponibili[sport] || [];
  }

  bookField(campo: Campo): void {
    alert(`Hai prenotato il ${campo.name} a ${campo.address}`);
  }

  logout(): void {
    this.authService.logout();

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
    }

    this.router.navigate(['/login']);
  }

}
