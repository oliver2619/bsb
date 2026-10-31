export interface SettingsJsonV1 {
    color: string;
    sound: string;
    wakeLock?: boolean;
    fullscreen?: boolean;
    defaultMeeting?: string;
    readonly version: 1;
}