import { Observable, Subscribable } from 'rxjs';
import { CscEvent } from './event';

export abstract class EventApiService {
  abstract getNextEvent(): Observable<CscEvent>;
  abstract getNextDscEvent(): Observable<CscEvent>;
  abstract getFutureEvents(): Observable<CscEvent[]>;
  abstract getPastEvents(): Observable<CscEvent[]>;
  abstract getEventByKeyOnce(key: string): Subscribable<CscEvent>;
  abstract addEvent(event: CscEvent): any;
  abstract getEvents(): Observable<CscEvent[]>;
  abstract updateEvent(key: string, value: CscEvent): Promise<void>;
  abstract removeEvents(events: CscEvent[]): Promise<void[]>;
}
