import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { gameOngoingSelector } from '../selector/game.selector';

export const gameGuard: CanActivateFn = (_route, _state) => {
  const ongoing = inject(Store).selectSignal(gameOngoingSelector)();
  if (ongoing) {
    return true;
  } else {
    return inject(Router).createUrlTree(['new-game']);
  }
};
