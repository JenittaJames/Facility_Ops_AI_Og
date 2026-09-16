import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input-component/input-component';
import { ButtonComponent } from '../../../shared/components/button-component/button-component';

@Component({
  selector: 'app-otp-component',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './otp-component.html',
  styleUrl: './otp-component.scss',
})
export class OtpComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  email = history.state.email;

  otpForm = this.fb.nonNullable.group({
    otp: ['', [Validators.minLength(6), Validators.maxLength(6)]]
  })
  isLoading: boolean = false

  onSubmit(): void {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched()
      return
    }

    const otp = this.otpForm.getRawValue().otp;

    const data = {
      email: this.email,
      otp: otp,
      purpose: 'registration'
    }

    this.authService.verifyOtp(data).subscribe({
      next: (response) => {
        console.log("login", response);
        this.router.navigate(['/auth/login'])
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
}
