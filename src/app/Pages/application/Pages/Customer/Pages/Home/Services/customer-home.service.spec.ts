import { TestBed } from '@angular/core/testing';

import { CustomerHomeService } from './customer-home.service';

describe('CustomerHomeService', () => {
  let service: CustomerHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
