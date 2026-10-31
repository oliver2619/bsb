import { Component } from '@angular/core';
import { I18nDirective } from '@pluto-ngtools/i18n';

@Component({
  imports: [I18nDirective],
  selector: 'bb-splash',
  styleUrl: './splash.component.scss',
  templateUrl: './splash.component.html',
})
export class SplashComponent {}
