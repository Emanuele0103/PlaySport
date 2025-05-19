import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:3000/api/bookings'; // Cambia con la tua API reale

  constructor(private http: HttpClient) {}

  // Ottieni le prenotazioni dell'utente
  getUserBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user`);
  }

  // Annulla prenotazione
  cancelBooking(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
