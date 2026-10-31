import { Component,  computed,  inject, isDevMode, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../element/menu/menu.component';
import { Store } from '@ngrx/store';
import { settingsThemeSelector } from '../selector/settings.selector';

@Component({
  imports: [RouterOutlet, MenuComponent],
  selector: 'bb-root',
  styleUrl: './root.component.scss',
  templateUrl: './root.component.html',
  host: {
    '(document:contextmenu)': 'onContextMenu($event)',
    '[class]': '\'theme-\' + theme()',
  }
})
export class RootComponent {

  readonly theme = inject(Store).selectSignal(settingsThemeSelector);
  private readonly routerOutlet = viewChild.required(RouterOutlet);

  readonly gameVisible = signal(false);

  onActivateRoute() {
    this.gameVisible.set(this.routerOutlet().activatedRouteData['gameVisible'] ?? false);
  }

  onContextMenu(ev: Event) {
    if(!isDevMode()) {
      ev.preventDefault();
    }
  }
}
