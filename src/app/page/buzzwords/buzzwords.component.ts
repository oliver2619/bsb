import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { I18nDirective, I18nPipe } from '@pluto-ngtools/i18n';
import { meetingsNamesSelector, meetingsSelector } from '../../selector/meetings.selector';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { PillComponent } from '../../element/pill/pill.component';
import { AutofocusDirective, EnabledIfDirective } from '@pluto-ngtools/component';
import { meetingsActions } from '../../action/meetings.action';
import { settingsActions } from '../../action/settings.action';
import { settingsDefaultMeetingSelector } from '../../selector/settings.selector';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 40;

@Component({
  imports: [I18nDirective, I18nPipe, FormField, PillComponent, AutofocusDirective, EnabledIfDirective],
  selector: 'bb-buzzwords',
  styleUrl: './buzzwords.component.scss',
  templateUrl: './buzzwords.component.html',
})
export class BuzzwordsComponent {

  private readonly store = inject(Store);
  readonly meetings = this.store.selectSignal(meetingsNamesSelector);
  private readonly defaultMeeting = this.store.selectSignal(settingsDefaultMeetingSelector)();
  readonly config = this.store.selectSignal(meetingsSelector);
  private readonly nameElement = viewChild.required<ElementRef<HTMLInputElement>>('name');
  private readonly model = signal({ meeting: this.meetings().includes(this.defaultMeeting) ? this.defaultMeeting : this.meetings()[0] ?? '', word: '' });
  readonly words = computed(() => {
    const arr = this.config().meetings[this.model().meeting];
    if (arr != undefined) {
      const ret = [...arr];
      ret.sort((w1, w2) => w1.localeCompare(w2));
      return ret;
    } else {
      return [];
    }
  });
  readonly numberOfWords = computed(() => this.words().length);
  readonly form = form(this.model, tree => {
    required(tree.word);
    maxLength(tree.word, NAME_MAX_LENGTH);
  });
  readonly canAdd = computed(() => {
    const word = this.model().word.trim();
    return word.length >= NAME_MIN_LENGTH && !this.words().includes(word);
  });

  onAdd() {
    this.store.dispatch(meetingsActions.addWord({ meeting: this.model().meeting, word: this.model().word.trim() }));
    this.model.update(v => ({ ...v, word: '' }));
    this.nameElement().nativeElement.focus();
  }

  onDelete(word: string) {
    this.store.dispatch(meetingsActions.deleteWord({ meeting: this.model().meeting, word }));
    this.nameElement().nativeElement.focus();
  }

  onEdit(oldName: string, newName: string) {
    const finalName = newName.trim();
    if (finalName.length >= NAME_MIN_LENGTH && finalName.length <= NAME_MAX_LENGTH && !this.words().includes(finalName)) {
      this.store.dispatch(meetingsActions.renameWord({ meeting: this.model().meeting, oldWord: oldName, newWord: finalName }));
    }
    this.nameElement().nativeElement.focus();
  }

  onEnterName() {
    if (this.canAdd()) {
      this.onAdd();
    }
  }

  onMeetingChange() {
    this.nameElement().nativeElement.focus();
    this.store.dispatch(settingsActions.selectMeeting({meeting: this.model().meeting}));
  }
}
