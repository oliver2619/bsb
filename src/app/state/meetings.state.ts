export interface MeetingsState {
    readonly meetings: Readonly<Record<string, readonly string[]>>;
    readonly modified: boolean;
}