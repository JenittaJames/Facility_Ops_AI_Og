import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth-service';

import { InputComponent } from '../../../shared/components/input-component/input-component';
import { PasswordInputComponent } from '../../../shared/components/password-input-component/password-input-component';
import { ButtonComponent } from '../../../shared/components/button-component/button-component';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    PasswordInputComponent,
    ButtonComponent
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });


  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const data = this.loginForm.getRawValue();

    this.isLoading = true;

    this.authService.login(data).subscribe({

      next: (response) => {

        this.isLoading = false;

        const user = response.data.user

        if (user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        }else if(user.role === 'facility-manager'){
          this.router.navigate(['/manager/dashboard'])
        } else {
          this.router.navigate(['/user/dashboard']);
        }
      },

      error: (error) => {

        this.isLoading = false;

        console.log(error);
      }

    });
  }
}