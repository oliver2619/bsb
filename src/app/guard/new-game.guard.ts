import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { meetingsExistSelector, meetingsHasEnoughWordsForGameSelector } from '../selector/meetings.selector';

export const newGameGuard: CanActivateFn = (_route, _state) => {
  const store = inject(Store);
  const hasEnough = store.selectSignal(meetingsHasEnoughWordsForGameSelector)();
  if (hasEnough) {
    return true;
  }
  const hasMeetings = store.selectSignal(meetingsExistSelector)();
  const router = inject(Router);
  if (hasMeetings) {
    return router.createUrlTree(['buzzwords']);
  } else {
    return router.createUrlTree(['meetings']);
  }
};
