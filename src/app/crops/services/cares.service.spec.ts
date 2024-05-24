import { TestBed } from '@angular/core/testing';

import { CaresService } from './cares.service';

describe('CaresService', () => {
  let service: CaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
