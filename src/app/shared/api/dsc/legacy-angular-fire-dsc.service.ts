import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Card } from './dsc';
import { DSCApiService } from './dsc.service';

@Injectable({
  providedIn: 'root',
})
export class LegacyAngularFireDSCApiService extends DSCApiService {
  cards: AngularFireList<Card>;
  _path: string;

  constructor(private _db: AngularFireDatabase) {
    super();
    this._path = '/dsc';
    this.cards = this._db.list(this._path, (ref) => {
      return ref.orderByChild('position');
    });
  }

  // TODO: abstract out the 'cards' here, we could reuse them for other informational pages someday
  public getCards(): Observable<Card[]> {
    return this.cards.snapshotChanges().pipe(
      filter((n) => true),
      map((items) => {
        return items.map((a) => {
          const data = a.payload.val();
          data.$key = a.payload.key;
          return data;
        });
      })
    ) as Observable<Card[]>;
  }

  public addCard(card: Card): Promise<Card> {
    return this.cards.push(card) as any as Promise<Card>;
  }

  public removeCard(card: Card): Promise<void> {
    return this.cards.remove(card.$key);
  }

  public updateCard(key: string, value: Card): Promise<void> {
    return this.cards.update(key, value);
  }
}
