import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'bb-field',
  styleUrl: './field.component.scss',
  templateUrl: './field.component.html',
  host: {
    '[class.checked]': 'checked()',
    '[class]': 'size()',
  },
})
export class FieldComponent {

  readonly word = input.required<string>();
  readonly checked = input.required<boolean>();
  readonly size = computed(() => {
    const len = this.word().length;
    if (len <= 5) {
      return 'l';
    } else if(len <= 10) {
      return 'm';
    } else {
      return 's';
    }
  });
}
