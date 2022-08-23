import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceSingleComponent } from './workspace-single.component';

describe('WorkspaceSingleComponent', () => {
  let component: WorkspaceSingleComponent;
  let fixture: ComponentFixture<WorkspaceSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
