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
  campi: { name: string, address: string }[] = []; // Array che contiene i campi disponibili per lo sport selezionato
  isAdmin: boolean = false; // Variabile booleana che indica se l'utente ha il ruolo di amministratore

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Sottoscrizione al valore dell'utente corrente nel servizio di autenticazione
    this.authService.user$.subscribe((user: { firstname: string; lastname: string; role: string }) => {
      if (user) { // Se esiste un utente autenticato
        this.user$ = user; // Imposta i dati dell'utente
        this.isAdmin = this.authService.isAdmin(); // Controlla se l'utente è un amministratore
        console.log('Utente autenticato:', this.user$); // Debug per controllare i dati dell'utente
        console.log('È admin?', this.isAdmin); // Debug per vedere se viene rilevato come admin
      } else {
        // Se non c'è utente autenticato, recupera i dati dal localStorage (memorizzazione locale del browser)
        const firstname = localStorage.getItem('firstname');
        const lastname = localStorage.getItem('lastname');
        const role = localStorage.getItem('role'); // Recupera il ruolo salvato, se disponibile
  
        this.user$ = {
          firstname: firstname || 'Utente sconosciuto',
          lastname: lastname || 'Sconosciuto',
          role: role || 'user' 
        };
  
        this.isAdmin = this.user$.role === 'ADMIN'; // Controlla se il ruolo è 'ADMIN'
        console.log('Dati utente caricati dal localStorage:', this.user$); // Debug per controllare i dati caricati
        console.log('È admin dal localStorage?', this.isAdmin); // Debug per il ruolo admin
      }
    });
  }
  

  // Getter che ritorna il nome completo dell'utente
  get userName(): string {
    return this.user$ ? `${this.user$.firstname} ${this.user$.lastname}` : 'Utente sconosciuto'; 
  }

  // Funzione per la selezione dello sport
  selectSport(sport: string) {
    this.selectedSport = sport; // Imposta lo sport selezionato
    this.getFieldForSport(sport); // Recupera i campi associati a quello sport
  }

  // Funzione che simula la chiamata di un servizio per ottenere i campi disponibili per lo sport selezionato
  getFieldForSport(sport: string) {
    // Oggetto che simula i campi disponibili per diversi sport
    const campiDisponibili = {
      calcio: [
        { name: 'Campo Calcio 1', address
    : 'Via Roma' },
        { name: 'Campo Calcio 2', address
    : 'Via Milano' }
      ],
      padel: [
        { name: 'Campo Padel 1', address
    : 'Via Napoli' },
        { name: 'Campo Padel 2', address
    : 'Via Firenze' }
      ],
      tennis: [
        { name: 'Campo Tennis 1', address
    : 'Via Torino' },
        { name: 'Campo Tennis 2', address
    : 'Via Bologna' }
      ],
      basket: [
        { name: 'Campo Basket 1', address
    : 'Via Palermo' },
        { name: 'Campo Basket 2', address
    : 'Via Genova' }
      ]
    };

    // Imposta l'array dei campi disponibili per lo sport selezionato. Se non ci sono campi per lo sport, imposta un array vuoto
    this.campi = campiDisponibili[sport] || [];
  }

  // Funzione per prenotare un campo
  bookField(campo: { name: string, address: string }) {
    // Visualizza un messaggio di conferma della prenotazione
    alert(`Hai prenotato il ${campo.name} a ${campo.address

    }`);
  }

  // Funzione per il logout dell'utente
  logout() {
    this.authService.logout(); // Chiama il servizio di autenticazione per eseguire il logout
    localStorage.removeItem('authToken'); // Rimuove il token di autenticazione dal localStorage
    localStorage.removeItem('firstname'); // Rimuove il nome dell'utente dal localStorage
    localStorage.removeItem('lastname'); // Rimuove il cognome dell'utente dal localStorage
    this.router.navigate(['/login']); // Reindirizza l'utente alla pagina di login
  }
}
