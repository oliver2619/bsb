import { effect, inject, Service } from '@angular/core';
import { Store } from '@ngrx/store';
import { settingsSelector } from '../selector/settings.selector';
import { SettingsState } from '../state/settings.state';
import { settingsActions } from '../action/settings.action';
import { LocalStorageService } from '@pluto-ngtools/storage';
import { SettingsJsonV1 } from '../json/settings-v1.json';

const LOCAL_STORAGE_KEY = 'settings';

@Service()
export class SettingsService {

    private readonly store = inject(Store);
    private readonly settings = this.store.selectSignal(settingsSelector);
    private readonly localStorageService = inject(LocalStorageService);

    constructor() {
        effect(() => {
            const s = this.settings();
            if (s.modified) {
                this.save(s);
                this.store.dispatch(settingsActions.save());
            }
        });
    }

    load() {
        const json = this.localStorageService.getJson<SettingsJsonV1>(LOCAL_STORAGE_KEY);
        if (json != undefined) {
            const def = this.settings();
            this.store.dispatch(settingsActions.load({
                fullscreen: json.fullscreen ?? def.fullscreen,
                theme: json.color,
                wakeLock: json.wakeLock ?? def.wakeLock,
                defaultMeeting: json.defaultMeeting ?? def.defaultMeeting,
            }));
        }
    }

    private save(s: SettingsState) {
        const json: SettingsJsonV1 = {
            color: s.theme,
            sound: 'none',
            version: 1,
            fullscreen: s.fullscreen,
            wakeLock: s.wakeLock,
            defaultMeeting: s.defaultMeeting,
        };
        this.localStorageService.setJson(LOCAL_STORAGE_KEY, json)
    }
}
