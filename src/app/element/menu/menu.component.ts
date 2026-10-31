import { Component, computed, inject, input} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { I18nDirective } from '@pluto-ngtools/i18n';
import { gameOngoingSelector } from '../../selector/game.selector';
import { DropDownButtonDirective } from '@pluto-ngtools/component';
import { meetingsExistSelector, meetingsHasEnoughWordsForGameSelector } from '../../selector/meetings.selector';
import { gameActions } from '../../action/game.action';

@Component({
  imports: [RouterLink, RouterLinkActive, I18nDirective, DropDownButtonDirective],
  selector: 'bb-menu',
  styleUrl: './menu.component.scss',
  templateUrl: './menu.component.html',
})
export class MenuComponent {

  readonly gameVisible = input.required<boolean>();

  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly gameOngoing = this.store.selectSignal(gameOngoingSelector);
  readonly meetingsExist = this.store.selectSignal(meetingsExistSelector);
  readonly enoughWords = this.store.selectSignal(meetingsHasEnoughWordsForGameSelector);

  onReset() {
    this.store.dispatch(gameActions.reset());
    this.router.navigateByUrl('/game');
  }

  onExitGame() {
    this.store.dispatch(gameActions.exit());
    this.router.navigateByUrl('/');
  }
}
