import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ICPCComponent } from './icpc.component';

describe('GuideComponent', () => {
  let component: ICPCComponent;
  let fixture: ComponentFixture<ICPCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ICPCComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ICPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
