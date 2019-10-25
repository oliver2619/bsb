
import {Component} from '@angular/core';
import {SettingsService} from 'src/app/settings/settings.service';

@Component({
    selector: 'bsb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    get colorSchema(): string {
        return this.settingsService.get().color;
    }

    constructor(private settingsService: SettingsService) {
    }
}
