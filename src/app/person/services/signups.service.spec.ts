import { TestBed } from '@angular/core/testing';

import { SignupsService } from './signups.service';

describe('SignupsService', () => {
  let service: SignupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
