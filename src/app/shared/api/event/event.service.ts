import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Event } from './event';
import { StorageService } from '../storage/storage.service';
import { Thenable, Promise } from 'firebase';
import { Query } from 'angularfire2/interfaces';
import 'rxjs/add/operator/map';

@Injectable()
export class EventApiService {
    events: FirebaseListObservable<Event[]>;
    _path: string;

    constructor(private _db: AngularFireDatabase, private _storageService: StorageService) {
        this._path = '/event';
        this.events = this.queryEvent({
            orderByChild: 'datetime/timeStartTimestamp'
        });
    }

    public getNextEvent(): FirebaseListObservable<Event> {
        return this.queryEvent({
            orderByChild: 'datetime/timeStartTimestamp',
            startAt: this.getTodayTimestamp(),
            limitToFirst: 1
        }).map(events => {
            return events[0];
        }) as FirebaseListObservable<Event>;
    }

    public getFutureEvents(): FirebaseListObservable<Event[]> {
        return this.queryEvent({
            orderByChild: 'datetime/timeStartTimestamp',
            startAt: this.getTodayTimestamp()
        });
    }

    public getPastEvents(): FirebaseListObservable<Event[]> {
        return this.reverse(
            this.queryEvent({
                orderByChild: 'datetime/timeStartTimestamp',
                endAt: this.getTodayTimestamp()
            })
        );
    }

    private getTodayTimestamp(): number {
        return new Date().setHours(0, 0, 0, 0);
    }

    private queryEvent(query: Query): FirebaseListObservable<Event[]> {
        return this._db.list(this._path, {
            query: query
        });
    }

    private reverse(listObservable: FirebaseListObservable<Event[]>): FirebaseListObservable<Event[]> {
        return listObservable.map(list => list.reverse()) as FirebaseListObservable<Event[]>;
    }

    public addEvent(event: Event): Thenable<Event> {
        return this.events.push(event);
    }

    public getEvents(): FirebaseListObservable<Event[]> {
        return this.reverse(this.events);
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
