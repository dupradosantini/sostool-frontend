import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceReadComponent } from './workspace-read.component';

describe('WorkspaceReadComponent', () => {
  let component: WorkspaceReadComponent;
  let fixture: ComponentFixture<WorkspaceReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
