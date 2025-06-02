import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface Struttura {
  id: number;
  nome: string;
  indirizzo: string;
  sport: string[];
  immagine: string;
  imgUrl: string;
  orarioApertura: string; // Orario come stringa formato "HH:mm"
  orarioChiusura: string;
}

@Component({
  selector: 'app-owner-structures',
  templateUrl: './owner-structures.component.html',
  styleUrls: ['./owner-structures.component.css'],
})
export class OwnerStructuresComponent implements OnInit {
  strutture: Struttura[] = [];
  formModel: Struttura = this.getEmptyStruttura();
  editMode: boolean = false;
  currentEditId: number | null = null;
  nextId: number = 1;
  anteprima: string | null = null;
  selectedFileName: string = '';

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.strutture = [
      {
        id: this.nextId++,
        nome: 'Sport Village Roma',
        indirizzo: 'Via Appia 123',
        sport: ['calcio', 'padel'],
        immagine: 'calcio1.jpg',
        imgUrl: 'assets/img/calcio1.jpg',
        orarioApertura: '14:00',
        orarioChiusura: '22:00',
      },
      {
        id: this.nextId++,
        nome: 'Tennis Club Firenze',
        indirizzo: 'Viale dei Campi 22',
        sport: ['tennis', 'basket'],
        immagine: 'tennis1.jpg',
        imgUrl: 'assets/img/tennis1.jpg',
        orarioApertura: '10:00',
        orarioChiusura: '22:00',
      },
    ];
  }

  onSportChange(event: any): void {
    const sport = event.target.value;
    if (event.target.checked) {
      if (!this.formModel.sport.includes(sport)) {
        this.formModel.sport.push(sport);
      }
    } else {
      this.formModel.sport = this.formModel.sport.filter((s) => s !== sport);
    }
  }

  getEmptyStruttura(): Struttura {
    return {
      id: 0,
      nome: '',
      indirizzo: '',
      sport: [],
      immagine: '',
      imgUrl: '',
      orarioApertura: '',
      orarioChiusura: '',
    };
  }

  onSubmit(): void {
    // Validazione orario apertura < chiusura
    if (this.formModel.orarioApertura >= this.formModel.orarioChiusura) {
      alert("L'orario di apertura deve essere precedente a quello di chiusura");
      return;
    }
    if (this.editMode) {
      this.strutture = this.strutture.map((s) =>
        s.id === this.currentEditId
          ? { ...this.formModel, id: this.currentEditId! }
          : s
      );
      this.annullaModifica();
    } else {
      const nuovaStruttura = { ...this.formModel, id: this.nextId++ };
      this.strutture.push(nuovaStruttura);
      this.formModel = this.getEmptyStruttura();
      this.anteprima = null;
      this.selectedFileName = '';
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.anteprima = e.target.result;
        this.formModel.imgUrl = this.anteprima;
      };
      reader.readAsDataURL(file);
    }
  }

  modificaStruttura(struttura: Struttura): void {
    this.formModel = { ...struttura };
    this.editMode = true;
    this.currentEditId = struttura.id;
    this.anteprima = struttura.imgUrl;
    this.selectedFileName = struttura.immagine;
  }

  annullaModifica(): void {
    this.editMode = false;
    this.currentEditId = null;
    this.formModel = this.getEmptyStruttura();
    this.anteprima = null;
    this.selectedFileName = '';
  }

  eliminaStruttura(id: number): void {
    this.strutture = this.strutture.filter((s) => s.id !== id);
    if (this.editMode && this.currentEditId === id) {
      this.annullaModifica();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
