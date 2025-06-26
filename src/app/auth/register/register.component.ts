import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm: FormGroup;
    errorMessage: string | null = null;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            email:['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
        },
        { validators: this.passwordMatchValidator },
        )
    }

    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get("password");
        const confirmPassword = formGroup.get("confirmPassword");

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({
                passwordMismatch: true })
                return { passwordMismatch: true };
        }
        if (confirmPassword?.hasError('passwordMismatch')) {
            delete confirmPassword.errors?.["passwordMismatch"];
            if (Object.keys(confirmPassword.errors || {}).length === 0) {
                confirmPassword.setErrors(null);
            }
        }
        return null;

    }

    async onSignUp() {
        if (this.registerForm.valid) {
            this.isLoading = true;
            this.errorMessage = null;

            const { email, password } = this.registerForm.value;
            try {
                await this.authService.register(email, password);
                this.router.navigate(['/']);
            } catch (error: any) {
                this.errorMessage = error.message || 'Registration failed. Please try again.';
            } finally {
                this.isLoading = false;
            }
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
            this.markFormGroupTouched();
        }
    }

    private markFormGroupTouched() {
        Object.keys(this.registerForm.controls).forEach((key) => {
            const control = this.registerForm.get(key);
            control?.markAsTouched();
        });
    }

    onInputChange() {
        if (this.errorMessage) {
            this.errorMessage = null;
        }
    }
}
