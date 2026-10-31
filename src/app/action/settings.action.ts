import { createActionGroup, emptyProps, props } from "@ngrx/store";

export interface SettingsSetAction {
    readonly fullscreen: boolean;
    readonly theme: string;
    readonly wakeLock: boolean;
}

export interface SettingsLoadAction {
    readonly fullscreen: boolean;
    readonly theme: string;
    readonly wakeLock: boolean;
    readonly defaultMeeting: string;
}

export interface SettingsSelectMeetingAction {
    readonly meeting: string;
}

export const settingsActions = createActionGroup({
    source: 'Settings',
    events: {
        load: props<SettingsLoadAction>(),
        save: emptyProps(),
        selectMeeting: props<SettingsSelectMeetingAction>(),
        set: props<SettingsSetAction>(),
    },
});