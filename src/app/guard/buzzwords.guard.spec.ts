import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { buzzwordsGuard } from './buzzwords.guard';

describe('buzzwordsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => buzzwordsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
