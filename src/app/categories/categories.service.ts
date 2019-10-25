import {Injectable} from '@angular/core';
import {CategoriesJson, CategoryJson} from 'src/app/categories/category.model';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    private static readonly STORE_KEY = 'categories';
    private static readonly STORE_VERSION = 1;

    private _categories: CategoriesJson;

    get allKeywords(): string[] {
        let ret: string[] = [];
        this._categories.categories.forEach(c => ret = ret.concat(c.keywords));
        return ret;
    }

    get categories(): CategoryJson[] {
        return this._categories.categories.slice(0).sort((c1, c2) => c1.name.localeCompare(c2.name));
    }

    get hasCategories(): boolean {
        return this._categories.categories.length > 0;
    }
    
    constructor() {
        this.load();
    }

    addCategory(category: string): void {
        this._categories.categories.push({
            id: this._categories.nextId.toString(),
            name: category,
            keywords: []
        });
        ++this._categories.nextId;
        this.save();
    }

    addKeyword(categoryId: string, keyword: string): void {
        this._categories.categories.find(c => c.id === categoryId).keywords.push(keyword);
        this.save();
    }

    getKeywords(categoryId: string): string[] {
        const cat = this._categories.categories.find(c => c.id === categoryId);
        return cat !== undefined ? cat.keywords.slice(0).sort((k1, k2) => k1.localeCompare(k2)) : [];
    }

    hasKeywords(categoryId: string): boolean {
        const cat = this._categories.categories.find(c => c.id === categoryId);
        return cat !== undefined ? cat.keywords.length > 0 : false;
    }

    removeCategory(id: string): void {
        this._categories.categories = this._categories.categories.filter(c => c.id !== id);
        this.save();
    }

    removeKeyword(categoryId: string, keyword: string): void {
        const cat = this._categories.categories.find(c => c.id === categoryId);
        if (cat !== undefined) {
            cat.keywords = cat.keywords.filter(k => k !== keyword);
            this.save();
        }
    }

    renameCategory(id: string, newName: string): void {
        this._categories.categories.find(c => c.id === id).name = newName;
        this.save();
    }

    private load(): void {
        const data = window.localStorage.getItem(`${environment.localStorePrefix}${CategoriesService.STORE_KEY}`);
        if (data !== null) {
            this._categories = JSON.parse(data);
        } else {
            this._categories = {
                categories: [],
                nextId: 1,
                version: CategoriesService.STORE_VERSION
            };
            this.save();
        }
    }

    private save(): void {
        window.localStorage.setItem(`${environment.localStorePrefix}${CategoriesService.STORE_KEY}`, JSON.stringify(this._categories));
    }
}
