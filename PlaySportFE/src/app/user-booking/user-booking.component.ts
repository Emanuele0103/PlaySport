// user-bookings.component.ts
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../shared/booking.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css'],
})
export class UserBookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getUserBookings().subscribe({
      next: (data) => (this.bookings = data),
      error: (err) => console.error('Errore prenotazioni:', err),
    });
  }

  cancelBooking(id: string) {
    this.bookingService.cancelBooking(id).subscribe(() => {
      this.loadBookings(); // Ricarica
    });
  }

  confirmDelete(id: string) {
    const conferma = confirm(
      'Sei sicuro di voler annullare questa prenotazione?'
    );
    if (conferma) {
      this.cancelBooking(id);
    }
  }
}
