
import {Observable} from "rxjs";

export enum DialogResult {
    OK = 0, CANCEL = 1
}

export interface Dialog {
    show(): Observable<DialogResult>;
}