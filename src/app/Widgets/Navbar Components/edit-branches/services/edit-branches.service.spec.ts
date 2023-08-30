import { TestBed } from '@angular/core/testing';

import { EditBranchesService } from './edit-branches.service';

describe('EditBranchesService', () => {
  let service: EditBranchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditBranchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
