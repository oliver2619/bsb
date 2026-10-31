export interface SettingsState {
    readonly theme: string;
    readonly wakeLock: boolean;
    readonly fullscreen: boolean;
    readonly defaultMeeting: string;
    readonly modified: boolean;
}