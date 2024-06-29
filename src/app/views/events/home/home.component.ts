import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CscEvent } from 'app/shared/api';
import { EventDataService } from 'app/views/events/event-data.service';
import { EventContainer } from '../eventContainer';
import { EventCardComponent } from '../../../shared/event-card/event-card.component';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'csc-events-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [NgIf, SpinnerComponent, NgFor, EventCardComponent],
})
export class EventsHomeComponent implements OnInit, OnDestroy {
  public upcomingEvents: EventContainer;
  public pastEvents: EventContainer;

  constructor(
    private _eventDataService: EventDataService,
    private router: Router
  ) {
    this.upcomingEvents = new EventContainer();
  }

  public ngOnInit(): void {
    this.upcomingEvents = this._eventDataService.getUpcomingEvents();
    if (this.pastEventsLoaded()) {
      this.pastEvents = this._eventDataService.getPastEvents();
    }
  }

  public loadPastEvents(): void {
    this.pastEvents = this._eventDataService.getPastEvents();
  }

  public pastEventsLoaded(): boolean {
    return this._eventDataService.pastEventsLoaded();
  }

  public selectEvent(event: CscEvent): void {
    this._eventDataService.setEvent(event);
    // this.router.navigate([`/events/${event.$key}`]);
  }

  public ngOnDestroy(): void {
    this.upcomingEvents.subscription.unsubscribe();
    if (this.pastEvents !== undefined) {
      this.pastEvents.subscription.unsubscribe();
    }
  }
}
