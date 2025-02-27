import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyMerchComponent } from './legacy-merch.component';

describe('LegacyMerchComponent', () => {
  let component: LegacyMerchComponent;
  let fixture: ComponentFixture<LegacyMerchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LegacyMerchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyMerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
