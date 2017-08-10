import { Component, OnInit } from '@angular/core';
import { EventApiService, Event } from 'app/shared/api';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'csc-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
    public eventsWeek: Event[] = [];
    public eventsWeekLoaded = false;
    public eventsMonth: Event[] = [];
    public eventsMonthLoaded = false;

    constructor(private _eventApi: EventApiService) { }

    ngOnInit() {
        this._eventApi.getEventsWeek()
            .subscribe(events => {
                this.eventsWeekLoaded = true;
                this.eventsWeek = events;
            });

        this._eventApi.getEventsMonth()
            .subscribe(events => {
                this.eventsMonthLoaded = true;
                this.eventsMonth = events;
            });
    }

}
