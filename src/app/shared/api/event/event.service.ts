import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Event } from './event';

@Injectable()
export class EventApiService {
    events: FirebaseListObservable<Event[]>;
    _path: string;

    constructor(private _db: AngularFireDatabase) {
        this._path = '/event';
        this.events = _db.list(this._path);
    }

    public addEvent(event: Event): firebase.Thenable<Event> {
        return this.events.push(event);
    }

    public getEvents(): FirebaseListObservable<Event[]> {
        return this.events;
    }

}
