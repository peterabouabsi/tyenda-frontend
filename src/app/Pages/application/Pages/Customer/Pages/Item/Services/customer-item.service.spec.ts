import { TestBed } from '@angular/core/testing';

import { CustomerItemService } from './customer-item.service';

describe('CustomerItemService', () => {
  let service: CustomerItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
