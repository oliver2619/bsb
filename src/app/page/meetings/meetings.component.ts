import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { I18nDirective, I18nPipe } from '@pluto-ngtools/i18n';
import { meetingsNamesSelector } from '../../selector/meetings.selector';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { EnabledIfDirective, AutofocusDirective } from '@pluto-ngtools/component';
import { meetingsActions } from '../../action/meetings.action';
import { PillComponent } from '../../element/pill/pill.component';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 40;

@Component({
  imports: [I18nDirective, FormField, EnabledIfDirective, AutofocusDirective, I18nPipe, PillComponent],
  selector: 'bb-meetings',
  styleUrl: './meetings.component.scss',
  templateUrl: './meetings.component.html',
})
export class MeetingsComponent {

  private readonly model = signal({
    name: '',
  });
  private readonly store = inject(Store);
  private readonly newMeeting = viewChild.required<ElementRef<HTMLElement>>('newMeeting');

  readonly meetings = this.store.selectSignal(meetingsNamesSelector);
  readonly form = form(this.model, tree => {
    required(tree.name);
    maxLength(tree.name, NAME_MAX_LENGTH);
  });
  readonly canAdd = computed(() => {
    const finalName = this.model().name.trim();
    return finalName.length >= NAME_MIN_LENGTH && !this.meetings().includes(finalName);
  });

  onAdd() {
    const name = this.model().name.trim();
    this.store.dispatch(meetingsActions.addMeeting({ name }));
    this.model.update(v => ({ ...v, name: '' }));
    this.newMeeting().nativeElement.focus();
  }

  onEnterNewMeeting() {
    if (this.canAdd()) {
      this.onAdd();
    }
  }

  onChange(oldName: string, newName: string) {
    const finalNewName = newName.trim();
    if (finalNewName.length >= NAME_MIN_LENGTH && finalNewName.length <= NAME_MAX_LENGTH && !this.meetings().includes(finalNewName)) {
      this.store.dispatch(meetingsActions.renameMeeting({ oldName, newName: finalNewName }));
    }
    this.newMeeting().nativeElement.focus();
  }

  onDelete(meeting: string) {
    this.store.dispatch(meetingsActions.deleteMeeting({ name: meeting }));
    this.newMeeting().nativeElement.focus();
  }
}
