import { TestBed } from '@angular/core/testing';

import { TeamViewService } from './team-view.service';

describe('TeamViewService', () => {
  let service: TeamViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
