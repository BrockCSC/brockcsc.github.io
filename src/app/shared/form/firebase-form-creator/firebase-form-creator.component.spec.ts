import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseFormCreatorComponent } from './firebase-form-creator.component';

describe('FirebaseFormCreatorComponent', () => {
  let component: FirebaseFormCreatorComponent;
  let fixture: ComponentFixture<FirebaseFormCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseFormCreatorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseFormCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
