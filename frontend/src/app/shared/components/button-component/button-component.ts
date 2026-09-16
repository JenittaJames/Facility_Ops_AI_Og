import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-component',
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {

  @Input() type : 'button' | 'submit' | 'reset' = 'button';

  @Input() disabled = false;

  @Input() loading = false;

}
