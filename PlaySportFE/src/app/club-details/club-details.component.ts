import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent implements OnInit {
  clubId: number;
  clubData: any;
  googleMapUrl: string = '';
  selectedDate: string = '';
  selectedSlot: string | null = null;

  minDate: string = '';
  maxDate: string = '';

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.clubId = Number(this.route.snapshot.paramMap.get('id'));
    this.clubData = this.getMockClubData(this.clubId);

    this.selectedDate = this.getTodayDate();
    this.minDate = this.selectedDate;
    this.maxDate = this.getFutureDate(7);

    if (this.clubData) {
      this.googleMapUrl = this.getMapEmbedUrl(this.clubData.address);
      this.updateCalendar();
    }
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getFutureDate(days: number): string {
    const future = new Date();
    future.setDate(future.getDate() + days);
    return future.toISOString().split('T')[0];
  }

  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    this.selectedSlot = null;
    this.updateCalendar();
  }

  onSelectSlot(hour: string): void {
    this.selectedSlot = hour;
  }

  onBook(): void {
    if (this.selectedSlot) {
      alert(`Prenotazione confermata per il ${this.selectedDate} alle ${this.selectedSlot} presso ${this.clubData.name}`);
      this.selectedSlot = null;
    }
  }

  updateCalendar(): void {
    this.clubData.calendar = this.generateMockCalendar();
  }

  getMockClubData(id: number) {
    const clubList: any[] = [
      { id: 1, name: 'Campo Calcio 1', address: 'Via Roma', image: 'assets/img/calcio1.jpg', calendar: [] },
      { id: 2, name: 'Campo Calcio 2', address: 'Via Milano', image: 'assets/img/calcio2.jpg', calendar: [] },
      { id: 3, name: 'Campo Padel 1', address: 'Via Napoli', image: 'assets/img/padel1.jpg', calendar: [] },
      { id: 4, name: 'Campo Padel 2', address: 'Via Firenze', image: 'assets/img/padel2.jpg', calendar: [] },
      { id: 5, name: 'Campo Tennis 1', address: 'Via Torino', image: 'assets/img/tennis1.jpg', calendar: [] },
      { id: 6, name: 'Campo Tennis 2', address: 'Via Bologna', image: 'assets/img/tennis2.jpg', calendar: [] },
      { id: 7, name: 'Campo Basket 1', address: 'Via Palermo', image: 'assets/img/basket1.jpg', calendar: [] },
      { id: 8, name: 'Campo Basket 2', address: 'Via Genova', image: 'assets/img/basket2.jpg', calendar: [] }
    ];

    return clubList.find(club => club.id === id);
  }

  generateMockCalendar() {
    const baseHour = 8;
    const slots = [];
    for (let i = 0; i < 8; i++) {
      slots.push({
        hour: `${(baseHour + i).toString().padStart(2, '0')}:00`,
        available: Math.random() > 0.3
      });
    }
    return slots;
  }

  getMapEmbedUrl(address: string): string {
    const query = encodeURIComponent(address);
    return `https://www.google.com/maps?q=${query}&output=embed`;
  }

  goBack(): void {
    this.location.back();
  }
}
