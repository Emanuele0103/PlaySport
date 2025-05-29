import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../styles.css'],
})
export class RegisterComponent {
  signupForm: FormGroup;
  avatarBase64: string = '';
  selectedFileName: string = '';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8,15}$')],
      ],
      role: ['USER', Validators.required],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = '';
    }
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = new FormData();

      // Aggiunta corretta dei campi
      for (const field in this.signupForm.value) {
        formData.append(field, this.signupForm.value[field]);
      }

      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile); // chiave = "avatar"
      }

      this.authService.register(formData).subscribe({
        next: (data) => {
          console.log('Registrazione completata!', data);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Errore durante la registrazione:', err);
        },
      });
    }
  }
}
