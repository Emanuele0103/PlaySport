import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  constructor(private sharedService :SharedService, private router: Router) { }

  fields = [
    { id: 1, name: 'Campo 1', sport: 'calcio', pricePerHour: 50 },
    { id: 2, name: 'Campo 2', sport: 'tennis', pricePerHour: 30 }
  ]; // Esempio di campi iniziali
  isEditing = false;
  isAdding = false;
  errorMessage = '';
  feedbackMessage = '';
  fieldData = {
    id: null,
    name: '',
    sport: '',
    pricePerHour: 0
  };

  // Funzione per mostrare il modulo di aggiunta campo
  showAddFieldForm() {
    this.resetForm();
    this.isAdding = true;
  }

  // Funzione per salvare un nuovo campo o modificare uno esistente
  saveField() {
    if (this.isEditing) {
      // Aggiorna il campo esistente
      const index = this.fields.findIndex(field => field.id === this.fieldData.id);
      if (index !== -1) {
        this.fields[index] = { ...this.fieldData };
        this.feedbackMessage = 'Campo aggiornato con successo!';
      }
    } else {
      // Aggiungi un nuovo campo
      const newField = { ...this.fieldData, id: this.fields.length + 1 };
      this.fields.push(newField);
      this.feedbackMessage = 'Nuovo campo aggiunto con successo!';
    }
    this.isEditing = false;
    this.isAdding = false;
    this.resetForm();
  }

  // Funzione per modificare un campo
  editField(field: any) {
    this.isEditing = true;
    this.isAdding = false;
    this.fieldData = { ...field }; // Pre-fill il form con i dati esistenti
  }

  // Funzione per eliminare un campo
  deleteField(id: number) {
    this.fields = this.fields.filter(field => field.id !== id);
    this.feedbackMessage = 'Campo eliminato con successo!';
  }

  // Funzione per resettare il form
  resetForm() {
    this.fieldData = {
      id: null,
      name: '',
      sport: '',
      pricePerHour: 0
    };
    this.errorMessage = '';
    this.feedbackMessage = '';
  }

  goBack() {
    this.sharedService.goBack();
  }
}
