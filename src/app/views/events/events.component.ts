import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventApiService, Event } from 'app/shared/api';
import { FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'csc-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
    public upcomingEvents: EventContainer;
    public pastEvents: EventContainer;

    constructor(private _eventApi: EventApiService) {
        this.upcomingEvents = new EventContainer();
    }

    public ngOnInit(): void {
        this.upcomingEvents.subscription = this._eventApi.getFutureEvents()
            .subscribe(events => {
                this.upcomingEvents.loaded = true;
                this.upcomingEvents.events = events;
            });
    }

    public loadPastEvents(): void {
        this.pastEvents = new EventContainer();
        this.pastEvents.subscription = this._eventApi.getPastEvents()
            .subscribe(events => {
                this.pastEvents.loaded = true;
                this.pastEvents.events = events;
            });
    }

    public ngOnDestroy(): void {
        this.upcomingEvents.subscription.unsubscribe();
        if (this.pastEvents !== undefined) {
            this.pastEvents.subscription.unsubscribe();
        }
    }
}

class EventContainer {
    events: Event[];
    loaded: boolean;
    subscription: Subscription;

    constructor() {
        this.events = [];
        this.loaded = false;
        this.subscription = null;
    }
}
