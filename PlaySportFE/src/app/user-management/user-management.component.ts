import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent {
  constructor(private sharedService: SharedService, private router: Router) {}

  fields = [
    {
      id: 1,
      resourceName: 'Campo 1',
      address: 'Via Roma 1',
      resourceType: 'calcio',
      resourceOwnerName: 'Mario Rossi',
    },
    {
      id: 2,
      resourceName: 'Campo 2',
      address: 'Via Milano 10',
      resourceType: 'tennis',
      resourceOwnerName: 'Luigi Bianchi',
    },
  ];

  isEditing = false;
  isAdding = false;
  errorMessage = '';
  feedbackMessage = '';
  fieldData = {
    id: null,
    resourceName: '',
    address: '',
    resourceType: '',
    resourceOwnerName: '',
  };

  showAddFieldForm() {
    this.resetForm();
    this.isAdding = true;
  }

  saveField() {
    if (
      !this.fieldData.resourceName ||
      !this.fieldData.address ||
      !this.fieldData.resourceType ||
      !this.fieldData.resourceOwnerName
    ) {
      this.errorMessage = 'Tutti i campi sono obbligatori.';
      return;
    }

    if (this.isEditing) {
      const index = this.fields.findIndex(
        (field) => field.id === this.fieldData.id
      );
      if (index !== -1) {
        this.fields[index] = { ...this.fieldData };
        this.feedbackMessage = 'Campo aggiornato con successo!';
      }
    } else {
      const newField = { ...this.fieldData, id: this.generateUniqueId() };
      this.fields.push(newField);
      this.feedbackMessage = 'Nuovo campo aggiunto con successo!';
    }

    this.isEditing = false;
    this.isAdding = false;
    this.resetForm();
  }

  editField(field: any) {
    this.isEditing = true;
    this.isAdding = false;
    this.fieldData = { ...field };
  }

  cancelEdit() {
    this.isEditing = false;
    this.isAdding = false;
    this.resetForm();
  }

  confirmDeleteField(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo campo?')) {
      this.deleteField(id);
    }
  }

  deleteField(id: number) {
    this.fields = this.fields.filter((field) => field.id !== id);
    this.feedbackMessage = 'Campo eliminato con successo!';
  }

  resetForm() {
    this.fieldData = {
      id: null,
      resourceName: '',
      address: '',
      resourceType: '',
      resourceOwnerName: '',
    };
    this.errorMessage = '';
    this.feedbackMessage = '';
  }

  generateUniqueId(): number {
    return this.fields.length > 0
      ? Math.max(...this.fields.map((f) => f.id)) + 1
      : 1;
  }

  goBack() {
    this.sharedService.goBack();
  }
}
