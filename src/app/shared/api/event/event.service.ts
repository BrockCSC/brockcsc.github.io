import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, QueryFn } from '@angular/fire/database';
import { Event } from './event';
import { StorageService } from '../storage/storage.service';


@Injectable()
export class EventApiService {
    events: AngularFireList<Event>;
    _path: string;

    constructor(private _db: AngularFireDatabase, private _storageService: StorageService) {
        this._path = '/event';
        this.events = this.queryEvent((ref) => {
            return ref.orderByChild('datetime/timeStartTimestamp');
        });
    }

    private queryEvent(query: QueryFn): AngularFireList<Event> {
        return this._db.list(this._path, query);
    }

    public getNextEvent(): Observable<Event> {
        return this.queryEvent(ref => {
            return ref.orderByChild('datetime/timeStartTimestamp')
                .startAt(this.getTodayTimestamp())
                .limitToFirst(1);
        }).valueChanges().pipe(map((obj) => obj[0]));
    }

    public getFutureEvents(): Observable<Event[]> {
        return this.keyPipe(this.queryEvent(ref => {
            return ref.orderByChild('datetime/timeStartTimestamp')
                .startAt(this.getTodayTimestamp());
        }));
    }

    public keyPipe<T>(obs: AngularFireList<T>): Observable<T[]> {
        return obs.snapshotChanges().pipe(map(items => {
            return items.map(a => {
                const data = a.payload.val() as any;
                const $key = a.payload.key;
                return { $key, ...data };
            });
        }));
    }

    public getPastEvents(): Observable<Event[]> {
        return this.reverse(
            this.keyPipe(this.queryEvent(ref => {
                return ref
                    .orderByChild('datetime/timeStartTimestamp')
                    .endAt(this.getTodayTimestamp());
            }))
        );
    }

    public getEventByKey(key: string): Observable<Event> {
        return this._db.object(`${this._path}/${key}`).valueChanges() as Observable<Event>;
    }

    private getTodayTimestamp(): number {
        return new Date().setHours(0, 0, 0, 0);
    }

    private reverse(listObservable: Observable<Event[]>): Observable<Event[]> {
        return listObservable.pipe(map(list => (list as any).reverse()));
    }

    public addEvent(event: Event): any {
        return this.events.push(event);
    }

    public getEvents(): Observable<Event[]> {
        return this.reverse(this.events.valueChanges());
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
