import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'] // Correzione "styleUrl" -> "styleUrls"
})
export class UserManagementComponent {

  constructor(private sharedService: SharedService, private router: Router) {}

  fields = [
    { id: 1, resourceName: 'Campo 1', address: 'Via Roma 1', resourceType: 'calcio', resourceOwnerName: 'Mario Rossi' },
    { id: 2, resourceName: 'Campo 2', address: 'Via Milano 10', resourceType: 'tennis', resourceOwnerName: 'Luigi Bianchi' }
  ]; // Esempio di campi iniziali

  isEditing = false;
  isAdding = false;
  errorMessage = '';
  feedbackMessage = '';
  fieldData = {
    id: null,
    resourceName: '',
    address: '',
    resourceType: '',
    resourceOwnerName: ''
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
    this.fieldData = { ...field }; 
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
      resourceName: '',
      address: '',
      resourceType: '',
      resourceOwnerName: ''
    };
    this.errorMessage = '';
    this.feedbackMessage = '';
  }

  goBack() {
    this.sharedService.goBack();
  }
}
