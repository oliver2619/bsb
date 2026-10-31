import { GameLoadAction, GameStartAction } from "../action/game.action";
import { GameState, GameWordState } from "../state/game.state";

export class GameModel {

    private readonly size: number;

    private constructor(
        private readonly meeting: string,
        private words: GameWordState[],
        private finished: boolean,
        private modified: boolean,
    ) {
        this.size = Math.sqrt(words.length) | 0;
    }

    static fromState(state: GameState): GameModel {
        return new GameModel(state.meeting, [...state.words], state.finished, state.modified);
    }

    static load(action: GameLoadAction): GameModel {
        const ret = new GameModel(action.meeting, [...action.words], false, false);
        ret.checkFinished();
        return ret;
    }

    static start(action: GameStartAction): GameModel {
        const words = action.words.map(it => ({
            checked: false,
            word: it,
        }));
        return new GameModel(action.meeting, words, false, true);
    }

    reset(): GameModel {
        const hasChecked = this.words.some(it => it.checked);
        if (hasChecked) {
            this.words = this.words.map(it => ({ ...it, checked: false }));
            this.finished = false;
            this.modified = true;
        }
        return this;
    }

    toggleWord(wordIndex: number): GameModel {
        this.words = this.words.map((w, i) => i === wordIndex ? ({ word: w.word, checked: !w.checked }) : w);
        this.modified = true;
        this.checkFinished();
        return this;
    }

    toState(): GameState {
        return {
            finished: this.finished,
            meeting: this.meeting,
            modified: this.modified,
            words: this.words,
        };
    }

    private checkFinished() {
        for (let i = 0; i < this.size; ++i) {
            if (this.isColFinished(i) || this.isRowFinished(i)) {
                this.finished = true;
                return;
            }
        }
        this.finished = this.isDiagonal1Finished() || this.isDiagonal2Finished();
    }

    private isColFinished(col: number): boolean {
        for (let y = 0; y < this.size; ++y) {
            if (!this.words[col + y * this.size].checked) {
                return false;
            }
        }
        return true;
    }

    private isRowFinished(row: number): boolean {
        for (let x = 0; x < this.size; ++x) {
            if (!this.words[x + row * this.size].checked) {
                return false;
            }
        }
        return true;
    }

    private isDiagonal1Finished(): boolean {
        for (let i = 0; i < this.size; ++i) {
            if (!this.words[i + i * this.size].checked) {
                return false;
            }
        }
        return true;
    }

    private isDiagonal2Finished(): boolean {
        for (let i = 0; i < this.size; ++i) {
            if (!this.words[i + (this.size - i - 1) * this.size].checked) {
                return false;
            }
        }
        return true;
    }
}