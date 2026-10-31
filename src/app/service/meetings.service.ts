import { effect, inject, Service } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@pluto-ngtools/storage';
import { meetingsSelector } from '../selector/meetings.selector';
import { CategoriesJson } from '../json/categories-v1.json';
import { meetingsActions } from '../action/meetings.action';
import { MeetingsJson } from '../json/meetings-v1.json';
import { MeetingsState } from '../state/meetings.state';

const OLD_LOCAL_STORAGE_KEY = 'categories';

const LOCAL_STORAGE_KEY = 'meetings';

@Service()
export class MeetingsService {

    private readonly store = inject(Store);
    private readonly localStorageService = inject(LocalStorageService);
    private readonly meetings = this.store.selectSignal(meetingsSelector);

    constructor() {
        effect(() => {
            const m = this.meetings();
            if (m.modified) {
                this.save(m);
                this.store.dispatch(meetingsActions.save());
            }
        });
    }

    load() {
        const jsonOld = this.localStorageService.getJson<CategoriesJson>(OLD_LOCAL_STORAGE_KEY);
        if (jsonOld != undefined) {
            this.migrateV1(jsonOld);
            return;
        }
        const jsonNew = this.localStorageService.getJson<MeetingsJson>(LOCAL_STORAGE_KEY);
        if (jsonNew != undefined) {
            this.store.dispatch(meetingsActions.load({ meetings: jsonNew.meetings }));
        }
    }

    private migrateV1(json: CategoriesJson) {
        const meetings: Record<string, string[]> = {};
        json.categories.forEach(c => {
            meetings[c.name] = c.keywords;
        });
        this.store.dispatch(meetingsActions.load({ meetings }));
        this.localStorageService.remove(OLD_LOCAL_STORAGE_KEY);
        this.save(this.meetings());
    }

    private save(m: MeetingsState) {
        const json: MeetingsJson = {
            meetings: m.meetings,
            version: 1,
        };
        this.localStorageService.setJson(LOCAL_STORAGE_KEY, json);
    }
}
