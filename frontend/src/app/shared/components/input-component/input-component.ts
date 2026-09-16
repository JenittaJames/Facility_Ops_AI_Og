import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-component',
  imports: [FormsModule],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() name = '';
  @Input() disabled = false;

  value = '';

  private onChange : (value : string) => void = () => {};

  private onTouched : () => void = () => {};

  writeValue(value:string) : void {
    this.value = value ?? '';
  }

  registerOnChange(fn : (value : string)=> void) : void {
    this.onChange = fn;
  }

  registerOnTouched(fn:()=>void) : void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled : boolean) : void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) : void {
    const input = event.target as HTMLInputElement;

    this.value = input.value;

    this.onChange(this.value)
  }

  onBlur(): void {
    this.onTouched();
  }
}
