import {Observable, Subscribable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, QueryFn} from '@angular/fire/database';
import {Event} from './event';
import {listWithKeys, objectWithKeys} from '../util';
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
        return listWithKeys(this.queryEvent(ref => {
            return ref.orderByChild('datetime/timeStartTimestamp')
                .startAt(this.getTodayTimestamp())
                .limitToFirst(1);
        })).pipe(map((obj) => obj[0]));
    }

    public getFutureEvents(): Observable<Event[]> {
        return listWithKeys(this.queryEvent(ref => {
            return ref.orderByChild('datetime/timeStartTimestamp')
                .startAt(this.getTodayTimestamp());
        }));
    }

    public getPastEvents(): Observable<Event[]> {
        return this.reverse(
            listWithKeys(this.queryEvent(ref => {
                return ref
                    .orderByChild('datetime/timeStartTimestamp')
                    .endAt(this.getTodayTimestamp());
            }))
        );
    }

    public getEventByKey(key: string): Observable<Event> {
        return objectWithKeys(this._db.object(`${this._path}/${key}`)) as Observable<Event>;
    }

    public getEventByKeyOnce(key: string): Subscribable<Event> {
        return this.getEventByKey(key).pipe(take(1));
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
        return this.reverse(listWithKeys(this.events));
    }

    public updateEvent(key: string, value: Event): Promise<void> {
        console.log(key);
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
