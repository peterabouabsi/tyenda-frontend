import { TestBed } from '@angular/core/testing';

import { StoreCardService } from './store-card.service';

describe('StoreCardService', () => {
  let service: StoreCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
