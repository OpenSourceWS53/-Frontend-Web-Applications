import { TestBed } from '@angular/core/testing';

import { ControlsToCropService } from './controls-to-crop.service';

describe('ControlsToCropService', () => {
  let service: ControlsToCropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlsToCropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
