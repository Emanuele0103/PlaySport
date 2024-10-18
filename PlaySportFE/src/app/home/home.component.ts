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
  selectedSport: string | null = null; // inizialmente null
  campi: { name: string, address: string, sport: string }[] = []; // Aggiunto 'sport'
  filteredFields: { name: string, address: string }[] = []; // Per i campi filtrati
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

      // Carica i campi all'accesso
      this.loadAllFields();
    });
  }

  // Funzione per ottenere il nome completo dell'utente
  get userName(): string {
    return this.user$ ? `${this.user$.firstname} ${this.user$.lastname}` : 'Utente sconosciuto';
  }

  // Funzione per caricare tutti i campi disponibili
  loadAllFields() {
    this.campi = [
      { name: 'Campo Calcio 1', address: 'Via Roma', sport: 'calcio' },
      { name: 'Campo Calcio 2', address: 'Via Milano', sport: 'calcio' },
      { name: 'Campo Padel 1', address: 'Via Napoli', sport: 'padel' },
      { name: 'Campo Padel 2', address: 'Via Firenze', sport: 'padel' },
      { name: 'Campo Tennis 1', address: 'Via Torino', sport: 'tennis' },
      { name: 'Campo Tennis 2', address: 'Via Bologna', sport: 'tennis' },
      { name: 'Campo Basket 1', address: 'Via Palermo', sport: 'basket' },
      { name: 'Campo Basket 2', address: 'Via Genova', sport: 'basket' }
    ];

    // Mostra subito tutti i campi dopo l'accesso
    this.filteredFields = [...this.campi];
  }

  // Funzione per la selezione dello sport
  selectSport(sport: string) {
    this.selectedSport = sport;
    this.getFieldForSport(sport);
  }

  // Filtra i campi in base allo sport selezionato
  getFieldForSport(sport: string) {
    this.filteredFields = this.campi.filter(field => field.sport === sport); // Filtra in base allo sport
  }

  // Funzione per prenotare un campo
  bookField(campo: { name: string, address: string }) {
    alert(`Hai prenotato il ${campo.name} a ${campo.address}`);
  }

  goToSettings() {
    this.router.navigate(['/setting']);
  }

  goToUserManager() {
    this.router.navigate(['/userManagement']);
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
