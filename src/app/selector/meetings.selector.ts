import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MeetingsState } from "../state/meetings.state";

export const meetingsSelector = createFeatureSelector<MeetingsState>('meetings');

export const meetingsNamesSelector = createSelector(
    meetingsSelector,
    m => Object.keys(m.meetings).sort((m1, m2) => m1.localeCompare(m2))
);

export const meetingsExistSelector = createSelector(
    meetingsSelector,
    m => Object.keys(m.meetings).length > 0,
);

export const meetingsHasEnoughWordsForGameSelector = createSelector(
    meetingsSelector,
    m => Object.values(m.meetings).some(it => it.length >= 9)
);