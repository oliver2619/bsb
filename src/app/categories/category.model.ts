
export interface CategoryJson {
    id: string;
    name: string;
    keywords: string[];
}

export interface CategoriesJson {
    categories: CategoryJson[];
    nextId: number;
    version: number;
}