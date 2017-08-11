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
    public eventsWeek: EventContainer;
    public eventsMonth: EventContainer;

    constructor(private _eventApi: EventApiService) {
        this.eventsWeek = new EventContainer();
        this.eventsMonth = new EventContainer();
    }

    public ngOnInit(): void {
        this.eventsWeek.subscription = this._eventApi.getEventsWeek()
            .subscribe(events => {
                this.eventsWeek.loaded = true;
                this.eventsWeek.events = events;
            });

        this.eventsMonth.subscription = this._eventApi.getEventsMonth()
            .subscribe(events => {
                this.eventsMonth.loaded = true;
                this.eventsMonth.events = events;
            });
    }

    public ngOnDestroy(): void {
        this.eventsWeek.subscription.unsubscribe();
        this.eventsMonth.subscription.unsubscribe();
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
