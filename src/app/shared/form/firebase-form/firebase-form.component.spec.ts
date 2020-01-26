import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseFormComponent } from './firebase-form.component';

describe('FirebaseFormComponent', () => {
  let component: FirebaseFormComponent;
  let fixture: ComponentFixture<FirebaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
