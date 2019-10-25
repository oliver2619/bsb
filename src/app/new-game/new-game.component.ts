
import {Component} from '@angular/core';
import {CategoriesService} from 'src/app/categories/categories.service';
import {CategoryJson} from 'src/app/categories/category.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {GameService} from 'src/app/game/game.service';
import {Router} from '@angular/router';

interface FormGroupModel {
    category: string;
}

@Component({
    selector: 'bsb-new-game',
    templateUrl: './new-game.component.html',
    styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent {

    formGroup: FormGroup;

    get categories(): CategoryJson[] {
        return this.categoriesService.categories;
    }

    get keywords(): string[] {
        const value: FormGroupModel = this.formGroup.value;
        return this.categoriesService.getKeywords(value.category);
    }

    get selected(): number {
        const value: FormGroupModel = this.formGroup.value;
        return this.categoriesService.getKeywords(value.category).length;
    }

    constructor(private categoriesService: CategoriesService, private gameService: GameService, private router: Router, formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group({});
        const firstCat = this.categoriesService.categories[0].id;
        this.formGroup.addControl('category', formBuilder.control(firstCat !== undefined ? firstCat : '', Validators.required));
    }

    canStart(size: number): boolean {
        return this.keywords.length >= size * size;
    }

    start(size: number): void {
        this.gameService.newGame(size, this.keywords);
        this.router.navigateByUrl('/game');
    }
}
