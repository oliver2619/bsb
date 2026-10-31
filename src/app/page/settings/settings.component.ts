import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Store } from '@ngrx/store';
import { settingsSelector } from '../../selector/settings.selector';
import { I18nDirective } from '@pluto-ngtools/i18n';
import { settingsActions } from '../../action/settings.action';

@Component({
  imports: [FormField, I18nDirective],
  selector: 'bb-settings',
  styleUrl: './settings.component.scss',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {

  readonly colors = Object.freeze(['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink', 'dark', 'neon', 'gold']);

  private readonly store = inject(Store);
  private readonly settings = this.store.selectSignal(settingsSelector)();
  private readonly model = signal({
    theme: this.settings.theme,
    fullscreen: this.settings.fullscreen,
    wakeLock: this.settings.wakeLock,
  });

  readonly form = form(this.model);

  onChange() {
    const values = this.model();
    this.store.dispatch(settingsActions.set({
      fullscreen: values.fullscreen,
      theme: values.theme,
      wakeLock: values.wakeLock,
    }));
  }
}
