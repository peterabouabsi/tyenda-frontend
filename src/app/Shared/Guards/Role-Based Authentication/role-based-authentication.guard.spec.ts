import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleBasedAuthenticationGuard } from './role-based-authentication.guard';

describe('roleBasedAuthenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleBasedAuthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
