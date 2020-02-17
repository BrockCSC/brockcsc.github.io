import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioCreatorComponent } from './radio-creator.component';

describe('RadioCreatorComponent', () => {
  let component: RadioCreatorComponent;
  let fixture: ComponentFixture<RadioCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
