import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecsComponent } from './execs.component';

describe('ExecsComponent', () => {
  let component: ExecsComponent;
  let fixture: ComponentFixture<ExecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExecsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
