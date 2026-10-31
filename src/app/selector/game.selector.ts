import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GameState } from "../state/game.state";

export const gameSelector = createFeatureSelector<GameState>('game');

export const gameOngoingSelector = createSelector(gameSelector, g => !g.finished && g.words.length > 0);

export const gameWordsSelector = createSelector(gameSelector, g => g.words);

export const gameFinishedSelector = createSelector(gameSelector, g => g.finished);