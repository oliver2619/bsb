import { MeetingsState } from "../state/meetings.state";

export class MeetingsModel {

    private constructor(private readonly meetings: Map<string, string[]>, private modified: boolean) { }

    static fromState(state: MeetingsState): MeetingsModel {
        return new MeetingsModel(new Map(Object.entries(state.meetings).map(it => [it[0], [...it[1]]])), state.modified);
    }

    addMeeting(name: string): MeetingsModel {
        this.meetings.set(name, []);
        this.modified = true;
        return this;
    }

    addWord(meeting: string, word: string): MeetingsModel {
        const words = this.meetings.get(meeting);
        if (words != undefined) {
            words.push(word);
            this.modified = true;
        }
        return this;
    }

    deleteMeeting(name: string): MeetingsModel {
        this.meetings.delete(name);
        this.modified = true;
        return this;
    }

    deleteWord(meeting: string, word: string): MeetingsModel {
        const words = this.meetings.get(meeting);
        if (words != undefined) {
            const i = words.indexOf(word);
            if (i >= 0) {
                words.splice(i, 1);
                this.modified = true;
            }
        }
        return this;
    }

    renameMeeting(oldName: string, newName: string): MeetingsModel {
        const words = this.meetings.get(oldName)!;
        this.meetings.delete(oldName);
        this.meetings.set(newName, words);
        this.modified = true;
        return this;
    }

    renameWord(meeting: string, oldName: string, newName: string): MeetingsModel {
        const words = this.meetings.get(meeting);
        if (words != undefined) {
            const i = words.indexOf(oldName);
            if (i >= 0) {
                words[i] = newName;
                this.modified = true;
            }
        }
        return this;
    }

    toState(): MeetingsState {
        return {
            meetings: Object.fromEntries(this.meetings),
            modified: this.modified,
        };
    }
}