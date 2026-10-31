import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GameWordState } from "../state/game.state";

export interface GameLoadAction {
    readonly meeting: string;
    readonly words: readonly GameWordState[];
}

export interface GameStartAction {
    readonly words: readonly string[];
    readonly meeting: string;
}

export interface GameToggleWordAction {
    readonly wordIndex: number;
}

export const gameActions = createActionGroup({
    source: 'Game',
    events: {
        exit: emptyProps(),
        load: props<GameLoadAction>(),
        reset: emptyProps(),
        save: emptyProps(),
        start: props<GameStartAction>(),
        toggleWord: props<GameToggleWordAction>(),
    }
});