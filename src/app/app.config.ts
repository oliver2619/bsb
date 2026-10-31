import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { I18nService, provideDictionaries } from '@pluto-ngtools/i18n';
import { setLocalStorageServiceKeyPrefix } from '@pluto-ngtools/storage';
import { provideState, provideStore } from '@ngrx/store';
import { settingsReducer } from './reducer/settings.reducer';
import { gameReducer } from './reducer/game.reducer';
import { SettingsService } from './service/settings.service';
import { meetingsReducer } from './reducer/meetings.reducer';
import { MeetingsService } from './service/meetings.service';
import { GameService } from './service/game.service';
import { SoundService } from './service/sound.service';

function onInit() {
  inject(I18nService).resolve('title').then(it => document.title = it);
  inject(SettingsService).load();
  inject(MeetingsService).load();
  const gameService = inject(GameService);
  const soundService = inject(SoundService);
  gameService.load();
  gameService.gameOverEvents.subscribe(() => {
    soundService.bullshit();
  })
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    provideDictionaries({
      de: () => import('./i18n/de').then(it => it.DE),
      en: () => import('./i18n/en').then(it => it.EN),
    }),
    provideStore(),
    provideState('settings', settingsReducer),
    provideState('meetings', meetingsReducer),
    provideState('game', gameReducer),
    setLocalStorageServiceKeyPrefix('bullshitbingo:'),
    provideAppInitializer(onInit),
  ],
};
