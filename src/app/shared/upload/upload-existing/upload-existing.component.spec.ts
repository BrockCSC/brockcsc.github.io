import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExistingComponent } from './upload-existing.component';

describe('UploadExistingComponent', () => {
  let component: UploadExistingComponent;
  let fixture: ComponentFixture<UploadExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadExistingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
