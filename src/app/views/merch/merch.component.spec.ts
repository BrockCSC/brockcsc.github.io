import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchComponent } from './merch.component';

describe('MerchComponent', () => {
  let component: MerchComponent;
  let fixture: ComponentFixture<MerchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MerchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
