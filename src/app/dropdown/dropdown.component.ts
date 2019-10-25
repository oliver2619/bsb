
import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';

@Component({
    selector: 'bsb-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnDestroy {

    dropdownVisible = false;

    private rootElement: Element;

    private mouseDownCallback = (ev: MouseEvent) => {
        if (this.dropdownVisible === true && !this.isClickInMenu(<Element> ev.srcElement)) {
            ev.preventDefault();
            this.hide();
        }
    };

    constructor(el: ElementRef) {
        this.rootElement = el.nativeElement;
    }

    ngOnDestroy(): void {
        this.hide();
    }

    ngOnInit(): void {
    }

    show(): void {
        if (!this.dropdownVisible) {
            this.dropdownVisible = true;
            window.setTimeout(() => {
                document.addEventListener('click', this.mouseDownCallback);
            }, 1);
        }
    }

    hide(): void {
        if (this.dropdownVisible) {
            this.dropdownVisible = false;
            window.setTimeout(() => {
                document.removeEventListener('click', this.mouseDownCallback);
            }, 1);
        }
    }

    private isClickInMenu(el: Element): boolean {
        if (el === this.rootElement)
            return true;
        if (el.parentElement === null)
            return false;
        return this.isClickInMenu(el.parentElement);
    }
}
