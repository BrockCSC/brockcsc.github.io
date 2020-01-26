import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxCreatorComponent } from './checkbox-creator.component';

describe('CheckboxCreatorComponent', () => {
  let component: CheckboxCreatorComponent;
  let fixture: ComponentFixture<CheckboxCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
