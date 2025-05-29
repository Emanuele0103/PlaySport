import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Campo {
  id: number;
  name: string;
  address: string;
  img: string;
}

interface User {
  id?: number;
  firstname: string;
  lastname: string;
  avatar?: string;
  role: string | null;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user$: User = {
    firstname: 'Utente',
    lastname: 'Sconosciuto',
    role: null,
  };
  selectedSport: string = '';
  campi: Campo[] = [];
  isAdmin: boolean = false;
  env = environment;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User | null) => {
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
      const avatar =
        localStorage.getItem('avatar') || 'assets/img/avatar-demo.png';
      const role = localStorage.getItem('role');
      this.user$ = { firstname, lastname, avatar, role };
    }
  }

  get userName(): string {
    return this.user$
      ? `${this.user$.firstname} ${this.user$.lastname}`
      : 'Utente Sconosciuto';
  }

  selectSport(sport: string): void {
    this.selectedSport = sport;
    this.getFieldForSport(sport);
  }

  getFieldForSport(sport: string): void {
    const campiDisponibili: { [key: string]: Campo[] } = {
      calcio: [
        {
          id: 1,
          name: 'Campo Calcio 1',
          address: 'Via Roma',
          img: 'calcio1.jpg',
        },
        {
          id: 2,
          name: 'Campo Calcio 2',
          address: 'Via Milano',
          img: 'calcio2.jpg',
        },
      ],
      padel: [
        {
          id: 3,
          name: 'Campo Padel 1',
          address: 'Via Napoli',
          img: 'padel1.jpg',
        },
        {
          id: 4,
          name: 'Campo Padel 2',
          address: 'Via Firenze',
          img: 'padel2.jpg',
        },
      ],
      tennis: [
        {
          id: 5,
          name: 'Campo Tennis 1',
          address: 'Via Torino',
          img: 'tennis1.jpg',
        },
        {
          id: 6,
          name: 'Campo Tennis 2',
          address: 'Via Bologna',
          img: 'tennis2.jpg',
        },
      ],
      basket: [
        {
          id: 7,
          name: 'Campo Basket 1',
          address: 'Via Palermo',
          img: 'basket1.jpg',
        },
        {
          id: 8,
          name: 'Campo Basket 2',
          address: 'Via Genova',
          img: 'basket2.jpg',
        },
      ],
    };

    this.campi = campiDisponibili[sport] || [];
  }

  bookField(campo: Campo): void {
    this.router.navigate(['/club', campo.id]);
  }

  logout(): void {
    this.authService.logout();

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
      localStorage.removeItem('avatar');
      localStorage.removeItem('role');
    }

    this.router.navigate(['/login']);
  }
}
