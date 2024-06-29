import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsHomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: EventsHomeComponent;
  let fixture: ComponentFixture<EventsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EventsHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
