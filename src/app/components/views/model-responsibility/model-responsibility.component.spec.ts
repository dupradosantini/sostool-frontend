import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelResponsibilityComponent } from './model-responsibility.component';

describe('ModelResponsibilityComponent', () => {
  let component: ModelResponsibilityComponent;
  let fixture: ComponentFixture<ModelResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelResponsibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
