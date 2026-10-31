import { Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { DropDownButtonDirective } from '@pluto-ngtools/component';
import { I18nDirective } from '@pluto-ngtools/i18n';

@Component({
  imports: [DropDownButtonDirective, I18nDirective],
  selector: 'bb-pill',
  styleUrl: './pill.component.scss',
  templateUrl: './pill.component.html',
  host: {
  },
})
export class PillComponent {

  readonly name = input.required<string>();
  readonly maxlength = input.required<number>();
  readonly edit = output<string>();
  readonly delete = output<void>();
  readonly isEditMode = signal(false);

  private readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('input');

  onDelete() {
    this.delete.emit();
  }

  onEdit(ev: Event) {
    this.isEditMode.set(true);
    requestAnimationFrame(() => {
      const inp = this.inputElement()?.nativeElement;
      if(inp != undefined) {
        inp.value = this.name();
        inp.focus();
      }
    });
  }

  onChange(newName: string) {
    this.isEditMode.set(false);
    this.edit.emit(newName);
  }

  onCancel() {
    this.isEditMode.set(false);
  }
}
