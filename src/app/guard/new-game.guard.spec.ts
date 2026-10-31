import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { newGameGuard } from './new-game.guard';

describe('newGameGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => newGameGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
