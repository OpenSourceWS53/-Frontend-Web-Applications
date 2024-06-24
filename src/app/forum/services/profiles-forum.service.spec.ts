import { TestBed } from '@angular/core/testing';

import { ProfilesForumService } from './profiles-forum.service';

describe('ProfilesForumService', () => {
  let service: ProfilesForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
