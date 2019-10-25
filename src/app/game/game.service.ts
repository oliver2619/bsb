import {Injectable} from '@angular/core';
import {GameJson, SelectedKeywordJson} from 'src/app/game/game.model';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private static readonly STORE_KEY = 'game';
    private static readonly STORE_VERSION = 1;

    private _game: GameJson;

    get bingo(): boolean {
        const size = this._game.keywords.length;
        for (let i = 0; i < size; ++i) {
            if (this.hasRow(i))
                return true;
            if (this.hasColumn(i))
                return true;
        }
        return this.hasDiagonal1() || this.hasDiagonal2();
    }

    get matrix(): SelectedKeywordJson[][] {
        return this._game.keywords;
    }

    get initialized(): boolean {
        return this._game !== undefined;
    }
    
    constructor() {
        this.load();
    }

    newGame(size: number, keywords: string[]): void {
        const remainingKeywords = keywords.slice(0);
        const usedKeywords: SelectedKeywordJson[][] = [];
        let chosen: number;
        for (let y = 0; y < size; ++y) {
            usedKeywords.push([]);
            for (let x = 0; x < size; ++x) {
                chosen = Math.floor(Math.random() * remainingKeywords.length);
                usedKeywords[y].push({
                    name: remainingKeywords[chosen],
                    selected: false
                });
                remainingKeywords.splice(chosen, 1);
            }
        }
        this._game = {
            keywords: usedKeywords,
            version: GameService.STORE_VERSION
        };
        this.save();
    }

    save(): void {
        window.localStorage.setItem(`${environment.localStorePrefix}${GameService.STORE_KEY}`, JSON.stringify(this._game));
    }

    private hasRow(row: number): boolean {
        const size = this._game.keywords.length;
        for (let i = 0; i < size; ++i) {
            if (this._game.keywords[row][i].selected === false)
                return false;
        }
        return true;
    }

    private hasColumn(col: number): boolean {
        const size = this._game.keywords.length;
        for (let i = 0; i < size; ++i) {
            if (this._game.keywords[i][col].selected === false)
                return false;
        }
        return true;
    }

    private hasDiagonal1(): boolean {
        const size = this._game.keywords.length;
        for (let i = 0; i < size; ++i) {
            if (this._game.keywords[i][i].selected === false)
                return false;
        }
        return true;
    }

    private hasDiagonal2(): boolean {
        const size = this._game.keywords.length;
        for (let i = 0; i < size; ++i) {
            if (this._game.keywords[size - i - 1][i].selected === false)
                return false;
        }
        return true;
    }

    private load(): void {
        const data = window.localStorage.getItem(`${environment.localStorePrefix}${GameService.STORE_KEY}`);
        if (data !== null) {
            this._game = JSON.parse(data);
        }
    }
}
