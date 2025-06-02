import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css'],
})
export class ClubDetailsComponent implements OnInit {
  clubId: number;
  clubData: any;
  googleMapUrl: SafeResourceUrl = '';
  selectedDate: string = '';
  selectedSlot: string | null = null;

  minDate: Date = new Date();
  maxDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.clubId = Number(this.route.snapshot.paramMap.get('id'));
    this.clubData = this.getMockClubData(this.clubId);

    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
    this.minDate = today;
    const max = new Date();
    max.setDate(max.getDate() + 7);
    this.maxDate = max;

    if (this.clubData) {
      this.googleMapUrl = this.getMapEmbedUrl(
        this.clubData.lat,
        this.clubData.lng
      );
      this.updateCalendar();
    }
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    if (date) {
      this.selectedDate = date.toISOString().split('T')[0];
      this.selectedSlot = null;
      this.updateCalendar();
    }
  }

  onSelectSlot(hour: string): void {
    this.selectedSlot = hour;
  }

  onBook(): void {
    if (this.selectedSlot) {
      alert(
        `Prenotazione confermata per il ${this.selectedDate} alle ${this.selectedSlot} presso ${this.clubData.name}`
      );
      this.selectedSlot = null;
    }
  }

  updateCalendar(): void {
    this.clubData.calendar = this.generateMockCalendar();
  }

  getMockClubData(id: number) {
    const clubList: any[] = [
      {
        id: 1,
        name: 'Campo Calcio 1',
        address: 'Via Roma',
        images: ['assets/img/calcio1.jpg'],
        lat: 41.9028,
        lng: 12.4964,
        orarioApertura: '08:00',
        orarioChiusura: '22:00',
        calendar: [],
      },
      {
        id: 2,
        name: 'Campo Calcio 2',
        address: 'Via Milano',
        images: ['assets/img/calcio2.jpg'],
        lat: 45.4642,
        lng: 9.19,
        orarioApertura: '09:00',
        orarioChiusura: '21:00',
        calendar: [],
      },
      {
        id: 3,
        name: 'Campo Padel 1',
        address: 'Via Napoli',
        images: ['assets/img/padel1.jpg', 'assets/img/padel2.jpg'],
        lat: 40.8522,
        lng: 14.2681,
        orarioApertura: '10:00',
        orarioChiusura: '23:00',
        calendar: [],
      },
      {
        id: 4,
        name: 'Campo Padel 2',
        address: 'Via Firenze',
        images: ['assets/img/padel2.jpg'],
        lat: 43.7696,
        lng: 11.2558,
        orarioApertura: '08:30',
        orarioChiusura: '20:30',
        calendar: [],
      },
      {
        id: 5,
        name: 'Campo Tennis 1',
        address: 'Via Torino',
        images: ['assets/img/tennis1.jpg'],
        lat: 45.0703,
        lng: 7.6869,
        orarioApertura: '07:00',
        orarioChiusura: '21:00',
        calendar: [],
      },
      {
        id: 6,
        name: 'Campo Tennis 2',
        address: 'Via Bologna',
        images: ['assets/img/tennis2.jpg'],
        lat: 44.4949,
        lng: 11.3426,
        orarioApertura: '08:00',
        orarioChiusura: '22:00',
        calendar: [],
      },
      {
        id: 7,
        name: 'Campo Basket 1',
        address: 'Via Palermo',
        images: ['assets/img/basket1.jpg'],
        lat: 38.1157,
        lng: 13.3615,
        orarioApertura: '09:00',
        orarioChiusura: '20:00',
        calendar: [],
      },
      {
        id: 8,
        name: 'Campo Basket 2',
        address: 'Via Genova',
        images: ['assets/img/basket2.jpg'],
        lat: 44.4056,
        lng: 8.9463,
        orarioApertura: '10:00',
        orarioChiusura: '21:30',
        calendar: [],
      },
    ];

    return clubList.find((club) => club.id === id);
  }

  generateMockCalendar() {
    const apertura = this.clubData.orarioApertura || '08:00';
    const chiusura = this.clubData.orarioChiusura || '20:00';

    const startHour = parseInt(apertura.split(':')[0], 10);
    const endHour = parseInt(chiusura.split(':')[0], 10);

    const now = new Date();
    const selected = new Date(this.selectedDate);
    const isToday = selected.toDateString() === now.toDateString();

    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const label = `${hour.toString().padStart(2, '0')}:00`;

      let isPast = false;
      if (isToday && hour <= now.getHours()) {
        isPast = true;
      }

      slots.push({
        hour: label,
        available: !isPast && Math.random() > 0.3,
      });
    }

    return slots;
  }

  getMapEmbedUrl(lat: number, lng: number): SafeResourceUrl {
    const apiKey = environment.googleMapsApiKey;
    const url = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=15`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack(): void {
    this.location.back();
  }
}
