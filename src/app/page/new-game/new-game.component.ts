import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Store } from '@ngrx/store';
import { I18nDirective } from '@pluto-ngtools/i18n';
import { EnabledIfDirective } from '@pluto-ngtools/component';
import { gameActions } from '../../action/game.action';
import { Router } from '@angular/router';
import { meetingsNamesSelector, meetingsSelector } from '../../selector/meetings.selector';
import { settingsActions } from '../../action/settings.action';
import { settingsDefaultMeetingSelector } from '../../selector/settings.selector';

@Component({
  imports: [I18nDirective, FormField, EnabledIfDirective],
  selector: 'bb-new-game',
  styleUrl: './new-game.component.scss',
  templateUrl: './new-game.component.html',
})
export class NewGameComponent {

  private readonly store = inject(Store);
  private readonly defaultMeeting = this.store.selectSignal(settingsDefaultMeetingSelector)();
  private readonly router = inject(Router);
  private readonly meetings = this.store.selectSignal(meetingsSelector);

  readonly meetingNames = computed(() => {
    return Object.entries(this.meetings().meetings).filter(it => it[1].length >= 9).map(it => it[0]).sort((i1, i2) => i1.localeCompare(i2));
  });

  private readonly model = signal({
    meeting: this.meetingNames().includes(this.defaultMeeting) ? this.defaultMeeting : this.meetingNames()[0],
  });

  private words = computed(() => this.meetings().meetings[this.model().meeting] ?? []);
  readonly numberOfWords = computed(() => this.words().length);

  readonly form = form(this.model);
  readonly canStartEasy = computed(() => this.numberOfWords() >= 9);
  readonly canStartMedium = computed(() => this.numberOfWords() >= 16);
  readonly canStartHard = computed(() => this.numberOfWords() >= 25);

  onStartEasy() {
    this.start(3);
  }

  onStartMedium() {
    this.start(4);
  }

  onStartHard() {
    this.start(5);
  }

  onMeetingChange() {
    this.store.dispatch(settingsActions.selectMeeting({meeting: this.model().meeting}));
  }

  private start(size: number) {
    const words = [...this.words()];
    words.sort(() => Math.random() * 2 - 1);
    this.store.dispatch(gameActions.start({ meeting: this.model().meeting, words: words.slice(0, size * size) }));
    this.router.navigateByUrl('/game');
  }
}
