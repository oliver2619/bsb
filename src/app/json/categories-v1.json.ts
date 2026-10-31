export interface CategoryJson {
    id: string;
    name: string;
    keywords: string[];
}

export interface CategoriesJson {
    categories: CategoryJson[];
    nextId: number;
    readonly version: 1;
}