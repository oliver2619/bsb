export interface MeetingsJson {
    readonly meetings: Readonly<Record<string, readonly string[]>>;
    readonly version: 1;
}