import { Component, forwardRef, Input } from '@angular/core';
import {ControlValueAccessor,NG_VALUE_ACCESSOR} from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-password-input-component',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './password-input-component.html',
  styleUrl: './password-input-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ]
})
export class PasswordInputComponent implements ControlValueAccessor {

  @Input() label = 'Password';
  @Input() placeholder = 'Enter your password';
  @Input() name = 'password';
  @Input() disabled = false;

  value = '';
  showPassword = false;

  private onChange: (value: string) => void = () => {};

  private onTouched: () => void = () => {};


  writeValue(value: string): void {
    this.value = value ?? '';
  }


  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  onInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.value = input.value;

    this.onChange(this.value);
  }


  onBlur(): void {
    this.onTouched();
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}