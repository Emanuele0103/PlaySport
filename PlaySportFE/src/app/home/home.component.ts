import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ResourceService, Resource } from '../home/resource.service';  // Importa il servizio e l'interfaccia Resource

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$: { firstname: string; lastname: string; role: string };
  selectedSport: string | null = null;
  campi: Resource[] = []; 
  filteredFields: Resource[] = [];
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private resourceService: ResourceService,  
    private router: Router
  ) { }

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

      // Carica le risorse dal server all'accesso
      this.loadAllFields();
    });
  }

  get userName(): string {
    return this.user$ ? `${this.user$.firstname} ${this.user$.lastname}` : 'Utente sconosciuto';
  }

// Carica tutte le risorse dal server
loadAllFields() {
  this.resourceService.getFields().subscribe(
    (fields) => {
      console.log('Campi caricati:', fields); // Log per controllare i campi caricati
      this.campi = fields;
      this.filteredFields = [...this.campi]; // Mostra tutte le risorse all'inizio
    },
    (error) => {
      console.error('Errore nel caricamento delle risorse:', error);
    }
  );
}


  // Funzione per selezionare uno sport (in base al tipo di risorsa)
  selectSport(sport: string) {
    this.selectedSport = sport;
    this.getFieldForSport(sport);
  }

  getFieldForSport(sport: string) {
    this.filteredFields = this.campi.filter(field => 
      field.resourceType?.name.toLowerCase() === sport.toLowerCase()
    );
  }  

  // Funzione per prenotare una risorsa
  bookField(campo: Resource) {
    alert(`Hai prenotato il ${campo.resourceName} a ${campo.address}`);
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
