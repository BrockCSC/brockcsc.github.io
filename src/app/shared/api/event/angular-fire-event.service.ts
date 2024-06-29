import { Injectable } from '@angular/core';
import {
  Database,
  DatabaseReference,
  child,
  endAt,
  limitToFirst,
  list,
  orderByChild,
  push,
  query,
  ref,
  remove,
  startAt,
  update,
} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { CscEvent } from './event';
import { EventApiService } from './event.service';

@Injectable({
  providedIn: 'root',
})
export class AngularFireEventApiService extends EventApiService {
  private ref: DatabaseReference;
  private events$: Observable<CscEvent[]>;

  constructor(db: Database, private _storageService: StorageService) {
    super();
    this.ref = ref(db, '/event');
    this.events$ = list(
      query(this.ref, orderByChild('datetime/timeStartTimestamp'))
    ).pipe(
      map((changes) =>
        changes.map(
          (change) =>
            ({
              $key: change.snapshot.key,
              ...change.snapshot.val(),
            } as CscEvent)
        )
      )
    );
  }

  public getNextEvent(): Observable<CscEvent> {
    return list(
      query(
        this.ref,
        orderByChild('datetime/timeStartTimestamp'),
        startAt(this.getTodayTimestamp()),
        limitToFirst(1)
      )
    ).pipe(
      filter((changes) => changes.length > 0),
      map((changes) => changes[0]),
      map(
        (change) =>
          ({
            $key: change.snapshot.key,
            ...change.snapshot.val(),
          } as CscEvent)
      )
    );
  }

  public getNextDscEvent(): Observable<CscEvent> {
    return list(
      query(
        this.ref,
        orderByChild('datetime/timeStartTimestamp'),
        startAt(this.getTodayTimestamp())
      )
    ).pipe(
      map((changes) =>
        changes
          .map(
            (change) =>
              ({
                $key: change.snapshot.key,
                ...change.snapshot.val(),
              } as CscEvent)
          )
          .find((event) => event.dscEvent)
      ),
      filter((event) => event !== undefined)
    );
  }

  public getFutureEvents(): Observable<CscEvent[]> {
    return list(
      query(
        this.ref,
        orderByChild('datetime/timeStartTimestamp'),
        startAt(this.getTodayTimestamp())
      )
    ).pipe(
      map((changes) =>
        changes.map(
          (change) =>
            ({
              $key: change.snapshot.key,
              ...change.snapshot.val(),
            } as CscEvent)
        )
      )
    );
  }

  public getPastEvents(): Observable<CscEvent[]> {
    return this.reverse(
      list(
        query(
          this.ref,
          orderByChild('datetime/timeStartTimestamp'),
          endAt(this.getTodayTimestamp())
        )
      ).pipe(
        map((changes) =>
          changes.map(
            (change) =>
              ({
                $key: change.snapshot.key,
                ...change.snapshot.val(),
              } as CscEvent)
          )
        )
      )
    );
  }

  public getEventByKey(key: string): Observable<CscEvent> {
    return this.events$.pipe(
      map((events) => events.find((event) => event.$key === key)),
      filter((event) => event !== undefined)
    );
  }

  private getTodayTimestamp(): number {
    return new Date().setHours(0, 0, 0, 0);
  }

  private reverse(
    listObservable: Observable<CscEvent[]>
  ): Observable<CscEvent[]> {
    return listObservable.pipe(map((list) => [...list].reverse()));
  }

  public async addEvent(event: CscEvent): Promise<void> {
    await push(this.ref, event);
  }

  public getEvents(): Observable<CscEvent[]> {
    return this.reverse(this.events$);
  }

  public async updateEvent(key: string, value: CscEvent): Promise<void> {
    await update(child(this.ref, key), value);
  }

  public async removeEvents(events: CscEvent[]): Promise<void> {
    await Promise.all(events.map((event) => this.removeEvent(event)));
  }

  private async removeEvent(event: CscEvent): Promise<void> {
    const image = event.image;
    const resources = event.resources;

    if (image !== undefined) {
      await this._storageService.removeFile(image.path, image.name);
    }
    if (resources !== undefined) {
      Promise.all(
        resources.map((resource) =>
          this._storageService.removeFile(resource.path, resource.name)
        )
      );
    }
    await this.removeEventByKey(event.$key);
  }

  private async removeEventByKey(key: string): Promise<void> {
    await remove(child(this.ref, key));
  }
}
