import { TestBed } from '@angular/core/testing';

import { StoreOrdersService } from './store-orders.service';

describe('CustomerOrdersService', () => {
  let service: StoreOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
