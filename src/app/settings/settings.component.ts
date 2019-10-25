
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingsService} from 'src/app/settings/settings.service';

interface FormGroupModel {
    color: string;
    sound: string;
}

@Component({
    selector: 'bsb-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

    formGroup: FormGroup;

    constructor(settingsService: SettingsService, formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group({});
        this.formGroup.addControl('color', formBuilder.control(settingsService.get().color, Validators.required));
        this.formGroup.addControl('sound', formBuilder.control(settingsService.get().sound, Validators.required));
        this.formGroup.valueChanges.subscribe((v: FormGroupModel) => {
            settingsService.set({
                color: v.color,
                sound: v.sound,
                version: 0
            });
        });
    }
}
