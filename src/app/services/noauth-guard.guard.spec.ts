import { TestBed, async, inject } from '@angular/core/testing';

import { NoauthGuardGuard } from './noauth-guard.guard';

describe('NoauthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoauthGuardGuard]
    });
  });

  it('should ...', inject([NoauthGuardGuard], (guard: NoauthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
