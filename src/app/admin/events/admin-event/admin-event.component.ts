import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Event, EventApiService} from '../../../shared/api';

@Component({
    selector: 'csc-admin-event',
    templateUrl: './admin-event.component.html',
    styleUrls: ['./admin-event.component.css']
})
export class AdminEventComponent implements OnInit {

    id: string;
    event: Event;

    constructor(private _route: ActivatedRoute, private _eventApiService: EventApiService) {
    }

    ngOnInit(): void {
        this._route.params.pipe(take(1)).subscribe(params => {
            this.id = params['id'];
        });
        this._eventApiService.getEventByKeyOnce(this.id).subscribe(value => {
            this.event = value;
        });
    }

}
