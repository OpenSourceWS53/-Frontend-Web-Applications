import { TestBed } from '@angular/core/testing';

import { PestsService } from './pests.service';

describe('PestsService', () => {
  let service: PestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
