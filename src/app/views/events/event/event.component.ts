import {take} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventDataService} from 'app/views/events/event-data.service';
import {CscEvent, EventApiService} from 'app/shared/api';
import {DatePipe} from '@angular/common';


@Component({
    providers: [DatePipe],
    selector: 'csc-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    event: CscEvent;
    error: string;
    loaded: boolean;
    id: string;

    constructor(private _eventDataService: EventDataService, private _eventApiService: EventApiService, private _route: ActivatedRoute) {
        this.loaded = false;
    }

    ngOnInit() {
        this._route.params.pipe(take(1)).subscribe(params => {
            this.id = params['id'];
            this.loadEvent();
        });
    }

    private loadEvent(): void {
        if (this._eventDataService.hasEvent()) {
            this.loaded = true;
            this.event = this._eventDataService.getEvent();
        } else {
            this._eventApiService.getEventByKeyOnce(this.id).subscribe(event => {
                this.loaded = true;
                if (event as any) {
                    this.event = event as CscEvent;
                } else {
                    this.error = `Event doesn't exist.`;
                }
            });
        }
    }

}
