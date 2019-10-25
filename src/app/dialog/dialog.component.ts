
import {Component, Input} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DialogResult, Dialog} from 'src/app/dialog/dialog.model';

@Component({
    selector: 'bsb-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements Dialog {

    @Input('ok')
    okVisible: boolean | string = false;

    @Input('cancel')
    cancelVisible: boolean | string = false;

    @Input()
    title: string;
    
    private result: Subject<DialogResult>;

    get visible(): boolean {
        return this.result !== undefined;
    }

    constructor() {}

    show(): Observable<DialogResult> {
        this.result = new Subject();
        return this.result;
    }

    ok(): void {
        this.hide(DialogResult.OK);
    }

    cancel(): void {
        this.hide(DialogResult.CANCEL);
    }

    private hide(result: DialogResult): void {
        this.result.next(result);
        this.result = undefined;
    }
}
