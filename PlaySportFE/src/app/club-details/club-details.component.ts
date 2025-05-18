import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent implements OnInit {
  clubId: string = '';
  clubData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.clubId = this.route.snapshot.paramMap.get('id') || '';
    // Simula caricamento dati
    this.clubData = {
      name: 'Padel Club Rende',
      address: 'Via Marco Polo 21, Rende',
      mapLink: 'https://www.google.com/maps?q=Via+Marco+Polo+21,+Rende',
      image: 'assets/img/padel1.jpg',
      calendar: [
        { hour: '08:00', available: true },
        { hour: '09:00', available: false },
        { hour: '10:00', available: true },
        // ...
      ]
    };
  }
}
