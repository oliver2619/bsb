
import {Component, ViewChild} from '@angular/core';
import {CategoriesService} from 'src/app/categories/categories.service';
import {CategoryJson} from 'src/app/categories/category.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DialogComponent} from 'src/app/dialog/dialog.component';
import {Dialog, DialogResult} from 'src/app/dialog/dialog.model';

interface FormGroupCategoryModel {
    category: string;
}

interface FormGroupEditModel {
    category: string;
}

@Component({
    selector: 'bsb-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

    @ViewChild(DialogComponent, {static: true})
    dialog: Dialog;

    formGroupCategory: FormGroup;
    formGroupEdit: FormGroup;

    editId: string;

    get canAdd(): boolean {
        return this.formGroupCategory.valid;
    }

    get canFinishEdit(): boolean {
        return this.formGroupEdit.valid;
    }

    get categories(): CategoryJson[] {
        return this.categoriesService.categories;
    }

    constructor(private categoriesService: CategoriesService, formBuilder: FormBuilder) {
        this.formGroupCategory = formBuilder.group({});
        this.formGroupCategory.addControl('category', formBuilder.control('', Validators.required));
        this.formGroupEdit = formBuilder.group({});
        this.formGroupEdit.addControl('category', formBuilder.control('', Validators.required));
    }

    add(): void {
        const value: FormGroupCategoryModel = this.formGroupCategory.value;
        this.categoriesService.addCategory(value.category);
        value.category = '';
        this.formGroupCategory.setValue(value);
    }

    cancelEdit(): void {
        this.editId = undefined;
    }

    edit(id: string): void {
        this.editId = id;
        const value: FormGroupEditModel = this.formGroupEdit.value;
        value.category = this.categories.find(c => c.id === id).name;
        this.formGroupEdit.setValue(value);
    }

    finishEdit(): void {
        const value: FormGroupEditModel = this.formGroupEdit.value;
        this.categoriesService.renameCategory(this.editId, value.category);
        this.editId = undefined;
    }

    remove(id: string): void {
        if (this.categoriesService.hasKeywords(id)) {
            this.dialog.show().subscribe(result => {
                if (result === DialogResult.OK)
                    this.categoriesService.removeCategory(id);
            });
        } else {
            this.categoriesService.removeCategory(id);
        }
    }
}
