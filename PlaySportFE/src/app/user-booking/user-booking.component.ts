import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css'],
})
export class UserBookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.bookings = [
      {
        id: '1',
        sport: 'Tennis',
        date: '2025-06-11',
        time: '17:00',
        fieldName: 'Campo Centrale',
      },
      {
        id: '2',
        sport: 'Calcio',
        date: '2025-06-12',
        time: '20:30',
        fieldName: 'Stadio Comunale',
      },
      {
        id: '3',
        sport: 'Padel',
        date: '2025-06-15',
        time: '16:00',
        fieldName: 'Padel Arena 2',
      },
      {
        id: '4',
        sport: 'Basket',
        date: '2025-06-18',
        time: '18:00',
        fieldName: 'Palestra Sud',
      },
      {
        id: '5',
        sport: 'Volley',
        date: '2025-06-20',
        time: '19:30',
        fieldName: 'Centro Sportivo Nord',
      },
      {
        id: '6',
        sport: 'Calcio',
        date: '2025-06-21',
        time: '21:00',
        fieldName: 'Stadio B',
      },
      {
        id: '7',
        sport: 'Padel',
        date: '2025-06-23',
        time: '17:45',
        fieldName: 'Padel Club Roma',
      },
    ];
  }

  cancelBooking(id: string) {
    this.bookings = this.bookings.filter((b) => b.id !== id);
  }

  confirmDelete(id: string) {
    const conferma = confirm(
      'Sei sicuro di voler annullare questa prenotazione?'
    );
    if (conferma) {
      this.cancelBooking(id);
    }
  }

  goBack() {
    this.location.back();
  }
}
