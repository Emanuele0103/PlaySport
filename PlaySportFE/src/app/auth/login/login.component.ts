import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../styles.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          console.log('Login response:', data); // Log della risposta
          
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('firstname', data.firstname);
          localStorage.setItem('lastname', data.lastname);

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = err.error?.message || 'Utente non esistente o password errata';
        }
      });
    } else {
      console.log('Form non valido');
    }
  }
}
