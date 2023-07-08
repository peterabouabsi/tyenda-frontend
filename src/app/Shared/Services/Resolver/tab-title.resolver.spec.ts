import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tabTitleResolver } from './tab-title.resolver';

describe('tabTitleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => tabTitleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
