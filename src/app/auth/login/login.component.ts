import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string | null = null;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    async onLogin() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = null;
            const { email, password } = this.loginForm.value;
            try {
                await this.authService.login(email, password);
                this.router.navigate(['/']);
            } catch (error: any) {
                this.errorMessage = error.message || 'Login failed. Please try again.';
            } finally {
                this.isLoading = false;
            }
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched() {
        Object.keys(this.loginForm.controls).forEach((key) => {
            const control = this.loginForm.get(key);
            control?.markAsTouched();
        })
    }

    onInputChange() {
        if (this.errorMessage) {
            this.errorMessage = null
        }
    }
}
