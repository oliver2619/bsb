import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { meetingsExistSelector } from '../selector/meetings.selector';

export const buzzwordsGuard: CanActivateFn = (_route, _state) => {
  const hasMeetings = inject(Store).selectSignal(meetingsExistSelector)();
  if (hasMeetings) {
    return true;
  } else {
    return inject(Router).createUrlTree(['meetings']);
  }
};
