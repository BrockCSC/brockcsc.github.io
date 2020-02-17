import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldCreatorComponent } from './text-field-creator.component';

describe('TextFieldCreatorComponent', () => {
  let component: TextFieldCreatorComponent;
  let fixture: ComponentFixture<TextFieldCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFieldCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
