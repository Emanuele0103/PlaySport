import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$: { firstname: string; lastname: string; role: string };
  selectedSport: string;
  campi: { name: string, address: string }[] = [];
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user: { firstname: string; lastname: string; role: string; }) => {
      if (user) {
        this.user$ = user;
        this.isAdmin = this.authService.isAdmin();
      } else {
        const firstname = localStorage.getItem('firstname');
        const lastname = localStorage.getItem('lastname');
        this.user$ = {
          firstname: firstname || 'Utente',
          lastname: lastname || 'sconosciuto',
          role: null
        };
      }
    });
  }


  // Funzione per ottenere il nome completo dell'utente
  get userName(): string {
    return this.user$ ? `${this.user$.firstname} ${this.user$.lastname}` : 'Utente sconosciuto';
  }

  // Funzione per la selezione dello sport
  selectSport(sport: string) {
    this.selectedSport = sport;
    this.getFieldForSport(sport);
  }

  // Simulazione di un servizio che recupera i campi per lo sport selezionato
  getFieldForSport(sport: string) {
    const campiDisponibili = {
      calcio: [
        { name: 'Campo Calcio 1', address: 'Via Roma' },
        { name: 'Campo Calcio 2', address: 'Via Milano' }
      ],
      padel: [
        { name: 'Campo Padel 1', address: 'Via Napoli' },
        { name: 'Campo Padel 2', address: 'Via Firenze' }
      ],
      tennis: [
        { name: 'Campo Tennis 1', address: 'Via Torino' },
        { name: 'Campo Tennis 2', address: 'Via Bologna' }
      ],
      basket: [
        { name: 'Campo Basket 1', address: 'Via Palermo' },
        { name: 'Campo Basket 2', address: 'Via Genova' }
      ]
    };

    // Imposta i campi in base allo sport selezionato
    this.campi = campiDisponibili[sport] || [];
  }

  // Funzione per prenotare un campo
  bookField(campo: { name: string, address: string }) {
    alert(`Hai prenotato il ${campo.name} a ${campo.address}`);
  }

  goToSettings() {
    this.router.navigate(['/setting'])
  }

  goToUserManager() {
    this.router.navigate(['/userManagement'])
  }

  // Funzione per il logout
  logout() {
    this.authService.logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    this.router.navigate(['/login']);
  }

}
