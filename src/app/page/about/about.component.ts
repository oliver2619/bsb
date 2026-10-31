import { Component } from '@angular/core';
import { I18nDirective } from '@pluto-ngtools/i18n';
import packageJson from '../../../../package.json';

@Component({
  imports: [I18nDirective],
  selector: 'bb-about',
  styleUrl: './about.component.scss',
  templateUrl: './about.component.html',
})
export class AboutComponent {

  readonly version = packageJson.version;
}
