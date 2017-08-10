import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Event } from './event';
import { StorageService } from '../storage/storage.service';
import { Thenable, Promise } from 'firebase';
import { Query } from 'angularfire2/interfaces';

@Injectable()
export class EventApiService {
    events: FirebaseListObservable<Event[]>;
    _path: string;

    constructor(private _db: AngularFireDatabase, private _storageService: StorageService) {
        this._path = '/event';
        this.events = _db.list(this._path);
    }

    public getEventsWeek(): FirebaseListObservable<Event[]> {
        const currDate = new Date();
        const currTimestamp = currDate.valueOf();
        const weekAheadTimestamp = currDate.setDate(currDate.getDate() + 7).valueOf();

        return this.getEventsBetween(currTimestamp, weekAheadTimestamp);
    }

    public getEventsMonth(): FirebaseListObservable<Event[]> {
        const currDate = new Date();
        const weekAheadTimestamp = currDate.setDate(currDate.getDate() + 7).valueOf();
        const monthAheadTimestamp = currDate.setMonth(currDate.getMonth() + 1).valueOf();

        return this.getEventsBetween(weekAheadTimestamp, monthAheadTimestamp);
    }

    public getNextEvent(): FirebaseListObservable<Event[]> {
        const currTimestamp = new Date().valueOf();
        return this.queryEvent({
            orderByChild: 'datetime/timeStartTimestamp',
            startAt: currTimestamp,
            limitToFirst: 1
        });
    }

    private getEventsBetween(start: number, end: number): FirebaseListObservable<Event[]> {
        return this.queryEvent({
            orderByChild: 'datetime/timeStartTimestamp',
            startAt: start,
            endAt: end
        });
    }

    private queryEvent(query: Query): FirebaseListObservable<Event[]> {
        return this._db.list(this._path, {
            query: query
        });
    }

    public addEvent(event: Event): Thenable<Event> {
        return this.events.push(event);
    }

    public getEvents(): FirebaseListObservable<Event[]> {
        return this.events;
    }

    public updateEvent(key: string, value: Event): Promise<void> {
        return this.events.update(key, value);
    }

    public removeEvents(events: Event[]): Promise<void[]> {
        return Promise.all(events.map(event => this.removeEvent(event)));
    }

    public removeEvent(event: Event): Promise<void> {
        const image = event.image;
        const resources = event.resources;

        if (image !== undefined) {
            this._storageService.removeFile(image.path, image.name);
        }
        if (resources !== undefined) {
            resources.forEach(resource => {
                this._storageService.removeFile(resource.path, resource.name);
            });
        }
        return this.removeEventByKey(event.$key);
    }

    public removeEventByKey(key: string): Promise<void> {
        return this.events.remove(key);
    }

}
