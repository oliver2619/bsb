import { Component, computed, DestroyRef, inject } from '@angular/core';
import { FieldComponent } from '../../element/field/field.component';
import { Store } from '@ngrx/store';
import { gameFinishedSelector, gameWordsSelector } from '../../selector/game.selector';
import { gameActions } from '../../action/game.action';
import { settingsSelector } from '../../selector/settings.selector';
import { WakeLockDirective, FullscreenDirective } from '@pluto-ngtools/component';
import { I18nDirective, IfLangDirective } from '@pluto-ngtools/i18n';
import { EfficiencyComponent } from '../../element/efficiency/efficiency.component';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [FieldComponent, WakeLockDirective, I18nDirective, IfLangDirective, EfficiencyComponent, DecimalPipe, FullscreenDirective],
  selector: 'bb-game',
  styleUrl: './game.component.scss',
  templateUrl: './game.component.html',
})
export class GameComponent {

  private readonly store = inject(Store);
  readonly words = this.store.selectSignal(gameWordsSelector);
  readonly size = computed(() => Math.sqrt(this.words().length) | 0);
  private readonly settings = this.store.selectSignal(settingsSelector);
  readonly wakeLock = computed(() => this.settings().wakeLock);
  readonly fullscreen = computed(() => this.settings().fullscreen);
  readonly finished = this.store.selectSignal(gameFinishedSelector);
  readonly efficiency = computed(() => {
    const size = Math.sqrt(this.words().length);
    const checked = this.words().filter(it => it.checked).length;
    const min = size;
    const max = size * (size - 1) + 1;
    return (checked - max) / (min - max);
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    const lock = (screen.orientation as any)['lock'];
    if (typeof lock === 'function') {
      lock('landscape').then(() => {
        destroyRef.onDestroy(() => {
          screen.orientation.unlock();
        });
      }).catch(() => console.log('Screen orientation lock is not supported.'));
    }
  }

  onToggle(index: number) {
    this.store.dispatch(gameActions.toggleWord({ wordIndex: index }));
  }
}
