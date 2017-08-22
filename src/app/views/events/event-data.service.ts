import { Injectable } from '@angular/core';
import { Event } from 'app/shared/api';

@Injectable()
export class EventDataService {
    event: Event;

    constructor() { }

    public hasEvent(): boolean {
        return this.event !== undefined;
    }

    public setEvent(event: Event): void {
        this.event = event;
    }

    public getEvent(): Event {
        return this.event;
    }

}
