import { Injectable } from '@angular/core';
import { Event, EventApiService } from 'app/shared/api';
import { Subscription } from 'rxjs';
import { EventContainer } from './eventContainer';

@Injectable()
export class EventDataService {
    private event: Event;
    private upcomingEvents: EventContainer;
    private pastEvents: EventContainer;

    constructor(private _eventApi: EventApiService) { }

    public hasEvent(): boolean {
        return this.event !== undefined;
    }

    public setEvent(event: Event): void {
        this.event = event;
    }

    public getEvent(): Event {
        return this.event;
    }

    public getUpcomingEvents(): EventContainer {
        if (this.upcomingEvents === undefined) {
            this.upcomingEvents = new EventContainer();
        }
        this.upcomingEvents.subscription = this._eventApi.getFutureEvents()
            .subscribe(events => {
                this.upcomingEvents.loaded = true;
                this.upcomingEvents.events = events;
            });
        return this.upcomingEvents;
    }

    public getPastEvents(): EventContainer {
        if (this.pastEvents === undefined) {
            this.pastEvents = new EventContainer();
        }
        this.pastEvents.subscription = this._eventApi.getPastEvents()
            .subscribe(events => {
                this.pastEvents.loaded = true;
                this.pastEvents.events = events;
            });
        return this.pastEvents;
    }

    public pastEventsLoaded(): boolean {
        return this.pastEvents !== undefined;
    }

}
