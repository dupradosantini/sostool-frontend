import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRoleReadComponent } from './model-role-read.component';

describe('ModelRoleReadComponent', () => {
  let component: ModelRoleReadComponent;
  let fixture: ComponentFixture<ModelRoleReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelRoleReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRoleReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
