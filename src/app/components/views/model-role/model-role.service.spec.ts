import { TestBed } from '@angular/core/testing';

import { ModelRoleService } from './model-role.service';

describe('ModelRoleService', () => {
  let service: ModelRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
