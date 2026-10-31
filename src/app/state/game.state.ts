export interface GameWordState {
    readonly word: string;
    readonly checked: boolean;
}

export interface GameState {
    readonly words: readonly GameWordState[];
    readonly finished: boolean;
    readonly modified: boolean;
    readonly meeting: string;
}