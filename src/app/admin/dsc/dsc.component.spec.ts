import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DSCComponent } from './dsc.component';

describe('DSCComponent', () => {
  let component: DSCComponent;
  let fixture: ComponentFixture<DSCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DSCComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DSCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
