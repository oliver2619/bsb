
import {Component} from '@angular/core';
import {CategoriesService} from 'src/app/categories/categories.service';
import {CategoryJson} from 'src/app/categories/category.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

interface FormGroupModel {
    category: string;
    keyword: string;
}

@Component({
    selector: 'bsb-keywords',
    templateUrl: './keywords.component.html',
    styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent {

    formGroup: FormGroup;
    
    get canAdd(): boolean {
        return this.formGroup.valid;
    }
    
    get categories(): CategoryJson[] {
        return this.categoriesService.categories;
    }
    
    get keywords(): string[] {
        const value: FormGroupModel = this.formGroup.value;
        return this.categoriesService.getKeywords(value.category);
    }
    
    get numberOfKeywords(): number {
        return this.keywords.length;
    }

    constructor(private categoriesService: CategoriesService, formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group({});
        const firstCat = this.categoriesService.categories[0].id;
        this.formGroup.addControl('category', formBuilder.control(firstCat !== undefined ? firstCat : '', Validators.required));
        this.formGroup.addControl('keyword', formBuilder.control('', Validators.required));
    }

    add(): void {
        const value: FormGroupModel = this.formGroup.value;
        this.categoriesService.addKeyword(value.category, value.keyword);
        value.keyword = '';
        this.formGroup.setValue(value);
    }
    
    remove(keyword: string) : void {
        const value: FormGroupModel = this.formGroup.value;
        this.categoriesService.removeKeyword(value.category, keyword);
    }
}
