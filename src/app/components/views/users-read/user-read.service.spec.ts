import { TestBed } from '@angular/core/testing';

import { UserReadService } from './user-read.service';

describe('UserReadService', () => {
  let service: UserReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
