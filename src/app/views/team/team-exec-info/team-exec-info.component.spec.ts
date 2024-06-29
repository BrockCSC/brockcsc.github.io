import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamExecInfoComponent } from './team-exec-info.component';

describe('TeamExecInfoComponent', () => {
  let component: TeamExecInfoComponent;
  let fixture: ComponentFixture<TeamExecInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamExecInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamExecInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
