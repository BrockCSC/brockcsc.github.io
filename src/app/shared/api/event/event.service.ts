import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Event } from './event';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class EventApiService {
    events: FirebaseListObservable<Event[]>;
    _path: string;

    constructor(private _db: AngularFireDatabase, private _storageService: StorageService) {
        this._path = '/event';
        this.events = _db.list(this._path);
    }

    public addEvent(event: Event): firebase.Thenable<Event> {
        return this.events.push(event);
    }

    public getEvents(): FirebaseListObservable<Event[]> {
        return this.events;
    }

    public deleteEvents(events: Event[]): Promise<void[]> {
        return Promise.all(events.map(event => this.deleteEvent(event)));
    }

    public deleteEvent(event: Event): firebase.Promise<void> {
        const image = event.image;
        const resources = event.resources;

        if (image !== undefined) {
            this._storageService.deleteFile(image.path, image.name);
        }
        if (resources !== undefined) {
            resources.forEach(resource => {
                this._storageService.deleteFile(resource.path, resource.name);
            });
        }
        return this.deleteEventByKey(event.$key);
    }

    public deleteEventByKey(key: string): firebase.Promise<void> {
        return this.events.remove(key);
    }

}
