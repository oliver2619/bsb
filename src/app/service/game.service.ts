import { effect, inject, Service } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@pluto-ngtools/storage';
import { gameSelector } from '../selector/game.selector';
import { gameActions } from '../action/game.action';
import { GameState } from '../state/game.state';
import { GameJson, GameJsonV2 } from '../json/game-v1.json';
import { Observable, Subject } from 'rxjs';

const LOCAL_STORAGE_KEY = 'game';

@Service()
export class GameService {

    private readonly store = inject(Store);
    private readonly localStorageService = inject(LocalStorageService);
    private readonly game = this.store.selectSignal(gameSelector);
    private readonly _gameOverEvents = new Subject<void>();
    private gameOver = false;

    get gameOverEvents(): Observable<void> {
        return this._gameOverEvents;
    }

    constructor() {
        effect(() => {
            const g = this.game();
            if (g.modified) {
                this.save(g);
                this.store.dispatch(gameActions.save());
            }
            const gameOver = g.finished && g.words.length > 0;
            if (gameOver !== this.gameOver) {
                this.gameOver = gameOver;
                if (gameOver) {
                    this._gameOverEvents.next();
                }
            }
        });
    }

    load() {
        const json = this.localStorageService.getJson<GameJson>(LOCAL_STORAGE_KEY);
        if (json == undefined) {
            return;
        }
        if (json.version === 1) {
            this.localStorageService.remove(LOCAL_STORAGE_KEY);
        } else {
            const json2 = json as GameJsonV2;
            this.store.dispatch(gameActions.load({
                meeting: json2.meeting,
                words: json2.words.map(it => ({ word: it.word, checked: it.checked })),
            }));
        }
    }

    private save(game: GameState) {
        if (game.finished || game.words.length === 0) {
            this.localStorageService.remove(LOCAL_STORAGE_KEY);
        } else {
            const json: GameJsonV2 = {
                words: game.words.map(it => ({ word: it.word, checked: it.checked })),
                meeting: game.meeting,
                version: 2,
            };
            this.localStorageService.setJson(LOCAL_STORAGE_KEY, json);
        }
    }
}
