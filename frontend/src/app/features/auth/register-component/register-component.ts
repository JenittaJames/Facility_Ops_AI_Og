import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequest } from '../../../core/models/auth.model';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input-component/input-component';
import { PasswordInputComponent } from '../../../shared/components/password-input-component/password-input-component';
import { SelectComponent } from '../../../shared/components/select-component/select-component';
import { ButtonComponent } from '../../../shared/components/button-component/button-component';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, InputComponent, PasswordInputComponent, SelectComponent, ButtonComponent, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {

  private authService = inject(AuthService)
  private fb = inject(FormBuilder)
  private router = inject(Router)


  userTypes = [
    {
      label: 'Individual',
      value: 'individual'
    },
    {
      label: 'Company',
      value: 'company'
    },
    {
      label: 'Team',
      value: 'team'
    }
  ];


  isLoading: boolean = false

  registerForm = this.fb.nonNullable.group({
    firstName : ['',Validators.required],
    lastName : ['',Validators.required],
    email : ['',[Validators.email,Validators.required]],
    phoneNumber : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    password : ['',Validators.minLength(6)],
    cPassword : ['',Validators.minLength(6)],
    userType : ['',Validators.required]
  })

  


  onSubmit () : void {

    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    const data : RegisterRequest = this.registerForm.getRawValue()

    this.authService.registerUser(data).subscribe({
      next : (response) => {
          this.router.navigate(['/auth/verify-otp'],{
            state : {
              email : data.email
            }
          })
      },
      error : (response)=>{
        console.log(response)
      }
    })
  }

}
