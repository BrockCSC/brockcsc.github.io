import { Observable } from 'rxjs';
import { CscEvent } from './event';

export abstract class EventApiService {
  abstract getNextEvent(): Observable<CscEvent>;
  abstract getNextDscEvent(): Observable<CscEvent>;
  abstract getFutureEvents(): Observable<CscEvent[]>;
  abstract getPastEvents(): Observable<CscEvent[]>;
  abstract getEventByKey(key: string): Observable<CscEvent>;
  abstract addEvent(event: CscEvent): Promise<void>;
  abstract getEvents(): Observable<CscEvent[]>;
  abstract updateEvent(key: string, value: CscEvent): Promise<void>;
  abstract removeEvents(events: CscEvent[]): Promise<void>;
}
