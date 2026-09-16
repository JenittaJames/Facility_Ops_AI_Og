import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../../core/models/select-option.model';

@Component({
  selector: 'app-select-component',
  imports: [],
  templateUrl: './select-component.html',
  styleUrl: './select-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label = '';

  @Input() placeholder = 'Select an option';

  @Input() name = '';

  @Input() options: SelectOption[] = [];

  @Input() disabled = false;

  value = '';

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


  onSelect(event: Event): void {

    const select = event.target as HTMLSelectElement;

    this.value = select.value;

    this.onChange(this.value);
  }


  onBlur(): void {
    this.onTouched();
  }
}
