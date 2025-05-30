import { Component, OnInit } from '@angular/core';

interface Struttura {
  id: number;
  nome: string;
  indirizzo: string;
  sport: string;
  immagine: string;
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

  ngOnInit(): void {}

  getEmptyStruttura(): Struttura {
    return {
      id: 0,
      nome: '',
      indirizzo: '',
      sport: '',
      immagine: '',
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
}
