import {Component, OnInit} from '@angular/core';
import {version} from '../../../package.json';

@Component({
    selector: 'bsb-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    get version(): string {
        return version;
    }

    constructor() {}

    ngOnInit() {
    }

}
