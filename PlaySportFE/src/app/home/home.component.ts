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
  campi: { name: string, location: string }[] = []; // Array che contiene i campi disponibili per lo sport selezionato
  isAdmin: boolean = false; // Variabile booleana che indica se l'utente ha il ruolo di amministratore

  constructor(private authService: AuthService, private router: Router) {}

  // Metodo del ciclo di vita di Angular, eseguito quando il componente viene inizializzato
  ngOnInit(): void {
    // Sottoscrizione al valore dell'utente corrente nel servizio di autenticazione
    this.authService.user$.subscribe((user: { firstname: string; lastname: string; role: string; }) => {
      if (user) { // Se esiste un utente autenticato
        this.user$ = user; // Imposta i dati dell'utente
        this.isAdmin = this.authService.isAdmin(); // Controlla se l'utente è un amministratore e imposta la variabile `isAdmin`
      } else { 
        // Se non c'è utente autenticato, recupera i dati dal localStorage (memorizzazione locale del browser)
        const firstname = localStorage.getItem('firstname');
        const lastname = localStorage.getItem('lastname');
        // Imposta l'utente come anonimo o con dati parziali
        this.user$ = {
          firstname: firstname || 'Utente sconosciuto', // Se `firstname` non esiste, imposta 'Utente'
          lastname: lastname || null, // Se `lastname` non esiste, imposta 'sconosciuto'
          role: null // Non viene impostato un ruolo
        };
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
        { name: 'Campo Calcio 1', location: 'Via Roma' },
        { name: 'Campo Calcio 2', location: 'Via Milano' }
      ],
      padel: [
        { name: 'Campo Padel 1', location: 'Via Napoli' },
        { name: 'Campo Padel 2', location: 'Via Firenze' }
      ],
      tennis: [
        { name: 'Campo Tennis 1', location: 'Via Torino' },
        { name: 'Campo Tennis 2', location: 'Via Bologna' }
      ],
      basket: [
        { name: 'Campo Basket 1', location: 'Via Palermo' },
        { name: 'Campo Basket 2', location: 'Via Genova' }
      ]
    };

    // Imposta l'array dei campi disponibili per lo sport selezionato. Se non ci sono campi per lo sport, imposta un array vuoto
    this.campi = campiDisponibili[sport] || [];
  }

  // Funzione per prenotare un campo
  bookField(campo: { name: string, location: string }) {
    // Visualizza un messaggio di conferma della prenotazione
    alert(`Hai prenotato il ${campo.name} a ${campo.location}`);
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
