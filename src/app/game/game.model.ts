
export interface SelectedKeywordJson {
    name: string;
    selected: boolean;
}

export interface GameJson {
    keywords: SelectedKeywordJson[][];
    version: number;
}