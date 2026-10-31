import { Component } from '@angular/core';
import { I18nDirective, IfLangDirective } from '@pluto-ngtools/i18n';

@Component({
  imports: [I18nDirective, IfLangDirective],
  selector: 'bb-rules',
  styleUrl: './rules.component.scss',
  templateUrl: './rules.component.html',
})
export class RulesComponent {}
