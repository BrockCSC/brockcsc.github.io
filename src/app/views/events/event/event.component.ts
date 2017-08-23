import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDataService } from 'app/views/events/event-data.service';
import { Event, EventApiService } from 'app/shared/api';
import 'rxjs/add/operator/take';

@Component({
    selector: 'csc-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    event: Event;
    error: string;
    loaded: boolean;
    id: string;

    constructor(private _eventDataService: EventDataService, private _eventApiService: EventApiService, private _route: ActivatedRoute) {
        this.loaded = false;
    }

    ngOnInit() {
        this._route.params.take(1).subscribe(params => {
            this.id = params['id'];
            this.loadEvent();
        });
    }

    private loadEvent(): void {
        if (this._eventDataService.hasEvent()) {
            this.loaded = true;
            this.event = this._eventDataService.getEvent();
        } else {
            this._eventApiService.getEventByKey(this.id).take(1).subscribe(event => {
                this.loaded = true;
                if ((event as any).$exists()) {
                    this.event = event;
                } else {
                    this.error = `Event doesn't exist.`;
                }
            });
        }
    }

}
