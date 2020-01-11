
import {Component, ViewChild} from '@angular/core';
import {GameService} from 'src/app/game/game.service';
import {SelectedKeywordJson} from 'src/app/game/game.model';
import {DialogComponent} from 'src/app/dialog/dialog.component';
import {Dialog} from 'src/app/dialog/dialog.model';

@Component({
    selector: 'bsb-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent {

    @ViewChild(DialogComponent, {static: true})
    dialog: Dialog;

    matrix: SelectedKeywordJson[][];

    get size(): number {
        return this.matrix.length;
    }
    
    constructor(private gameService: GameService) {
        this.matrix = gameService.matrix;
    }

    getWordSizeClass(word: string): string {
        const length = word.split(' ').sort((e1, e2) => e2.length - e1.length)[0].length;
        if(length < 10)
            return 'small';
        return length > 16 ? 'large' : '';
    }
    
    reset(): void {
        this.matrix.forEach(row => {
            row.forEach(kw => kw.selected = false);
        });
        this.gameService.save();
    }

    toggle(x: number, y: number): void {
        this.matrix[y][x].selected = !this.matrix[y][x].selected;
        this.gameService.save();
        if (this.gameService.bingo) {
            this.dialog.show().subscribe(result => {
                this.reset();
            });
        }
    }   
}
