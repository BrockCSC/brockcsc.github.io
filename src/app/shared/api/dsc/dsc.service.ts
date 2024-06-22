import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  QueryFn,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Card } from './dsc';

@Injectable({
  providedIn: 'root',
})
export class DSCApiService {
  cards: AngularFireList<Card>;
  _path: string;

  constructor(private _db: AngularFireDatabase) {
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

  public updateFoodItem(key: string, value: Card): Promise<void> {
    return this.cards.update(key, value);
  }

  // public getFoodItems(): Observable<Food[]> {
  //   return this.foodItems.valueChanges() as Observable<Food[]>;
  // }

  // public removeFoodItems(foodItems: Food[]): Promise<void[]> {
  //   return Promise.all(foodItems.map((food) => this.removeFoodItem(food)));
  // }

  // public removeFoodItemByKey(key: string): Promise<void> {
  //   return this.foodItems.remove(key);
  // }

  // public queryFoodItems(query: QueryFn): Observable<Food[]> {
  //   return this._db.list(this._path, query).valueChanges() as Observable<
  //     Food[]
  //   >;
  // }
}
