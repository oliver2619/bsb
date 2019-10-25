
import {Injectable} from '@angular/core';
import {SettingsJson} from 'src/app/settings/settings.model';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private static readonly STORE_KEY = 'settings';
    private static readonly STORE_VERSION = 1;

    private _settings: SettingsJson;

    constructor() {
        this.load();
    }

    get(): SettingsJson {
        return this._settings;
    }

    set(settings: SettingsJson): void {
        this._settings = settings;
        this.save();
    }

    private load(): void {
        const data = window.localStorage.getItem(`${environment.localStorePrefix}${SettingsService.STORE_KEY}`);
        if (data !== null) {
            this._settings = JSON.parse(data);
        } else {
            this._settings = {
                color: 'green',
                sound: 'none',
                version: SettingsService.STORE_VERSION
            };
            this.save();
        }

    }

    private save(): void {
        window.localStorage.setItem(`${environment.localStorePrefix}${SettingsService.STORE_KEY}`, JSON.stringify(this._settings));
    }
}
