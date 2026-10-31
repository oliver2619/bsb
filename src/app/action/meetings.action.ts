import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { MeetingsState } from "../state/meetings.state";

export interface MeetingsAddAction {
    readonly name: string;
}

export interface MeetingsDeleteAction {
    readonly name: string;
}

export interface MeetingsLoadAction {
    readonly meetings: Readonly<Record<string, readonly string[]>>;
}

export interface MeetingsRenameAction {
    readonly oldName: string;
    readonly newName: string;
}

export interface WordAddAction {
    readonly meeting: string;
    readonly word: string;
}

export interface WordDeleteAction {
    readonly meeting: string;
    readonly word: string;
}

export interface WordRenameAction {
    readonly meeting: string;
    readonly oldWord: string;
    readonly newWord: string;
}


export const meetingsActions = createActionGroup({
    source: 'Meetings',
    events: {
        addMeeting: props<MeetingsAddAction>(),
        addWord: props<WordAddAction>(),
        deleteMeeting: props<MeetingsDeleteAction>(),
        deleteWord: props<WordDeleteAction>(),
        load: props<MeetingsLoadAction>(),
        renameMeeting: props<MeetingsRenameAction>(),
        renameWord: props<WordRenameAction>(),
        save: emptyProps(),
    }
});