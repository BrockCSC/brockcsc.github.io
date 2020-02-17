import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProminentContainerComponent } from './prominent-container.component';

describe('ProminentContainerComponent', () => {
  let component: ProminentContainerComponent;
  let fixture: ComponentFixture<ProminentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProminentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProminentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
