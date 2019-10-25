import {Component, Input, ViewChild} from '@angular/core';
import {GameService} from 'src/app/game/game.service';
import {CategoriesService} from 'src/app/categories/categories.service';
import {DropdownComponent} from 'src/app/dropdown/dropdown.component';

@Component({
    selector: 'bsb-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    @ViewChild(DropdownComponent, {static: true})
    dropdown: DropdownComponent;
    
    @Input()
    title: string;

    get gameVisible(): boolean {
        return this.gameService.initialized;
    }

    get keywordsVisible(): boolean {
        return this.categoriesService.hasCategories;
    }

    get newGameVisible(): boolean {
        return this.categoriesService.hasCategories;
    }

    constructor(private gameService: GameService, private categoriesService: CategoriesService) {}

    toggleDropdown(): void {
        this.dropdown.show();
    }
}
