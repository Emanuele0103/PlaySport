import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface Struttura {
  id: number;
  nome: string;
  indirizzo: string;
  sport: string;
  immagine: string;
  imgUrl: string;
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

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.strutture = [
      {
        id: this.nextId++,
        nome: 'Sport Village Roma',
        indirizzo: 'Via Appia 123',
        sport: 'calcio',
        immagine: 'calcio1.jpg',
        imgUrl: 'assets/img/calcio1.jpg',
      },
      {
        id: this.nextId++,
        nome: 'Tennis Club Firenze',
        indirizzo: 'Viale dei Campi 22',
        sport: 'tennis',
        immagine: 'tennis1.jpg',
        imgUrl: 'assets/img/tennis1.jpg',
      },
    ];
  }

  getEmptyStruttura(): Struttura {
    return {
      id: 0,
      nome: '',
      indirizzo: '',
      sport: '',
      immagine: '',
      imgUrl: '',
    };
  }

  onSubmit(): void {
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
    }
  }

  anteprima: string | null = null;

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
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
  }

  annullaModifica(): void {
    this.editMode = false;
    this.currentEditId = null;
    this.formModel = this.getEmptyStruttura();
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
