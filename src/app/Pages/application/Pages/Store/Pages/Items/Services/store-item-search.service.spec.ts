import { TestBed } from '@angular/core/testing';

import { StoreItemSearchService } from './store-item-search.service';

describe('CustomerSearchService', () => {
  let service: StoreItemSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreItemSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
