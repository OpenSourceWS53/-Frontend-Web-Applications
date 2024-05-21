import { TestBed } from '@angular/core/testing';

import { SowingsService } from './sowings.service';

describe('SowingsService', () => {
  let service: SowingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SowingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
