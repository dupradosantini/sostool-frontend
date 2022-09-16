import { TestBed } from '@angular/core/testing';

import { ModelResponsibilityService } from './model-responsibility.service';

describe('ModelResponsibilityService', () => {
  let service: ModelResponsibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelResponsibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
