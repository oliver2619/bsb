import { createReducer, on } from "@ngrx/store";
import { MeetingsState } from "../state/meetings.state"
import { meetingsActions, MeetingsAddAction, MeetingsDeleteAction, MeetingsLoadAction, MeetingsRenameAction, WordAddAction, WordDeleteAction, WordRenameAction } from "../action/meetings.action";
import { MeetingsModel } from "../model/meetings.model";

const initialState: MeetingsState = {
    meetings: {},
    modified: false,
};

function onAddMeeting(state: MeetingsState, action: MeetingsAddAction): MeetingsState {
    return MeetingsModel.fromState(state).addMeeting(action.name).toState();
}

function onAddWord(state: MeetingsState, action: WordAddAction): MeetingsState {
    return MeetingsModel.fromState(state).addWord(action.meeting, action.word).toState();
}

function onLoad(_state: MeetingsState, action: MeetingsLoadAction): MeetingsState {
    return {
        meetings: action.meetings,
        modified: false,
    };
}

function onDeleteMeeting(state: MeetingsState, action: MeetingsDeleteAction): MeetingsState {
    return MeetingsModel.fromState(state).deleteMeeting(action.name).toState();
}

function onDeleteWord(state: MeetingsState, action: WordDeleteAction): MeetingsState {
    return MeetingsModel.fromState(state).deleteWord(action.meeting, action.word).toState();
}

function onRenameMeeting(state: MeetingsState, action: MeetingsRenameAction): MeetingsState {
    return MeetingsModel.fromState(state).renameMeeting(action.oldName, action.newName).toState();
}

function onRenameWord(state: MeetingsState, action: WordRenameAction): MeetingsState {
    return MeetingsModel.fromState(state).renameWord(action.meeting, action.oldWord, action.newWord).toState();
}

function onSave(state: MeetingsState): MeetingsState {
    return {
        ...state,
        modified: false,
    };
}

export const meetingsReducer = createReducer(
    initialState,
    on(meetingsActions.addMeeting, onAddMeeting),
    on(meetingsActions.addWord, onAddWord),
    on(meetingsActions.deleteMeeting, onDeleteMeeting),
    on(meetingsActions.deleteWord, onDeleteWord),
    on(meetingsActions.load, onLoad),
    on(meetingsActions.renameMeeting, onRenameMeeting),
    on(meetingsActions.renameWord, onRenameWord),
);