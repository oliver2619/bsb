import { createReducer, on } from "@ngrx/store";
import { GameState } from "../state/game.state";
import { gameActions, GameLoadAction, GameStartAction, GameToggleWordAction } from "../action/game.action";
import { GameModel } from "../model/game.model";

const initialState: GameState = {
    words: [],
    meeting: '',
    finished: true,
    modified: false,
};

function onExit(_state: GameState): GameState {
    return {
        meeting: '',
        words: [],
        finished: true,
        modified: true,
    };
}

function onLoad(_state: GameState, action: GameLoadAction): GameState {
    return GameModel.load(action).toState();
}

function onReset(state: GameState): GameState {
    return GameModel.fromState(state).reset().toState();
}

function onSave(state: GameState): GameState {
    return {
        ...state,
        modified: false,
    };
}

function onStart(_state: GameState, action: GameStartAction): GameState {
    return GameModel.start(action).toState();
}

function onToggleWord(state: GameState, action: GameToggleWordAction): GameState {
    return GameModel.fromState(state).toggleWord(action.wordIndex).toState();
}

export const gameReducer = createReducer(
    initialState,
    on(gameActions.exit, onExit),
    on(gameActions.load, onLoad),
    on(gameActions.reset, onReset),
    on(gameActions.save, onSave),
    on(gameActions.start, onStart),
    on(gameActions.toggleWord, onToggleWord),
);