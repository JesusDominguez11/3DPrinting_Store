import { Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isRegister: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validators: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      // Marcar todos los campos como touched para mostrar errores
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { username, email, password } = this.registerForm.value;

    this.authService.register(username, email, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/']); // Redirige al home después de registro
      },
      error: (error) => {
        this.isLoading = false;
        // Manejo de errores específicos del backend
        if (error.error?.type === 'ValidationError') {
          this.errorMessage = error.error.message;
        } else if (error.status === 409) {
          this.errorMessage = 'El nombre de usuario o email ya está en uso';
        } else {
          this.errorMessage = 'Error al registrar la cuenta. Por favor intenta nuevamente.';
        }
        console.error('Registration error:', error);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.showPassword ? 'text' : 'password';
    }
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
    const confirmField = document.getElementById('confirmPassword') as HTMLInputElement;
    if (confirmField) {
      confirmField.type = this.showConfirmPassword ? 'text' : 'password';
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  get f() {
    return this.registerForm.controls;
  }
}