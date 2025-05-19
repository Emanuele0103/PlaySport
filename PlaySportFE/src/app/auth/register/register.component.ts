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
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFileName = '';
    }
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const newUser = {
        ...this.signupForm.value,
        avatar: this.avatarBase64 || null,
      };

      this.authService.register(newUser).subscribe({
        next: (data) => {
          console.log('Registrazione completata con successo!', data);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Errore durante la registrazione:', err);
        },
      });
    } else {
      console.log('Form non valido');
    }
  }
}
