import { TestBed } from '@angular/core/testing';

import { StoreHomeService } from './store-home.service';

describe('StoreHomeService', () => {
  let service: StoreHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
