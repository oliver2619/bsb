import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SettingsState } from "../state/settings.state";

export const settingsSelector = createFeatureSelector<SettingsState>('settings');

export const settingsThemeSelector = createSelector(settingsSelector, s => s.theme);

export const settingsDefaultMeetingSelector = createSelector(settingsSelector, s => s.defaultMeeting);