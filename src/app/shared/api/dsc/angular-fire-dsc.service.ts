import { Injectable } from '@angular/core';
import {
  Database,
  DatabaseReference,
  child,
  get,
  list,
  push,
  ref,
  remove,
  update,
} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from './dsc';
import { DSCApiService } from './dsc.service';

@Injectable({
  providedIn: 'root',
})
export class AngularFireDSCApiService extends DSCApiService {
  private ref: DatabaseReference;
  private cards$: Observable<Card[]>;

  constructor(db: Database) {
    super();
    this.ref = ref(db, '/dsc');
    this.cards$ = list(this.ref).pipe(
      map((queryChanges) =>
        queryChanges.map(
          (change) =>
            ({
              $key: change.snapshot.key,
              ...change.snapshot.val(),
            } as Card)
        )
      )
    );
  }

  getCards(): Observable<Card[]> {
    return this.cards$;
  }

  async addCard(card: Card): Promise<Card> {
    const snapshot = await get(push(this.ref, card));
    return {
      $key: snapshot.key,
      ...snapshot.val(),
    };
  }

  async removeCard(card: Card): Promise<void> {
    await remove(child(this.ref, card.$key));
  }

  async updateCard(key: string, value: Card): Promise<void> {
    await update(child(this.ref, key), value);
  }
}
