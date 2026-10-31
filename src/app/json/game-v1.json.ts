export interface SelectedKeywordJson {
    name: string;
    selected: boolean;
}

export interface CheckedWordJson {
    word: string;
    checked: boolean;
}

export interface GameJson {
    readonly version: number;
}

export interface GameJsonV1 extends GameJson{
    keywords: SelectedKeywordJson[][];
    readonly version: 1;
}

export interface GameJsonV2 extends GameJson {
    words: CheckedWordJson[];
    meeting: string;
    readonly version: 2;
}