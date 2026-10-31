import { createReducer, on } from "@ngrx/store";
import { SettingsState } from "../state/settings.state";
import { settingsActions, SettingsLoadAction, SettingsSelectMeetingAction, SettingsSetAction } from "../action/settings.action";
import { meetingsActions, MeetingsDeleteAction } from "../action/meetings.action";

const initialState: SettingsState = {
    fullscreen: false,
    theme: 'orange',
    wakeLock: true,
    defaultMeeting: '',
    modified: false,
};

function onDeleteMeeting(state: SettingsState, action: MeetingsDeleteAction): SettingsState {
    const modified = state.defaultMeeting === action.name;
    return {
        ...state,
        defaultMeeting: modified ? '' : state.defaultMeeting,
        modified,
    }
}

function onLoad(_state: SettingsState, action: SettingsLoadAction): SettingsState {
    return {
        fullscreen: action.fullscreen,
        theme: action.theme,
        wakeLock: action.wakeLock,
        defaultMeeting: action.defaultMeeting,
        modified: false,
    };
}

function onSave(state: SettingsState): SettingsState {
    return {
        ...state,
        modified: false,
    };
}

function onSelectMeeting(state: SettingsState, action: SettingsSelectMeetingAction): SettingsState {
    return {
        ...state,
        defaultMeeting: action.meeting,
        modified: true,
    };
}

function onSet(state: SettingsState, action: SettingsSetAction): SettingsState {
    return {
        fullscreen: action.fullscreen,
        theme: action.theme,
        wakeLock: action.wakeLock,
        defaultMeeting: state.defaultMeeting,
        modified: true,
    };
}

export const settingsReducer = createReducer(
    initialState,
    on(meetingsActions.deleteMeeting, onDeleteMeeting),
    on(settingsActions.load, onLoad),
    on(settingsActions.save, onSave),
    on(settingsActions.selectMeeting, onSelectMeeting),
    on(settingsActions.set, onSet),
);