import { Injectable } from '@angular/core';
import {
  Database,
  DatabaseReference,
  child,
  list,
  orderByChild,
  push,
  query,
  ref,
  remove,
  update,
} from '@angular/fire/database';
import { Observable, map } from 'rxjs';
import { Food } from './food';
import { FoodApiService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class AngularFireFoodApiService extends FoodApiService {
  private ref: DatabaseReference;
  private foodItems$: Observable<Food[]>;

  constructor(db: Database) {
    super();
    this.ref = ref(db, '/food');
    this.foodItems$ = list(query(this.ref, orderByChild('section'))).pipe(
      map((changes) =>
        changes.map(
          (change) =>
            ({
              $key: change.snapshot.key,
              ...change.snapshot.val(),
            } as Food)
        )
      )
    );
  }

  async addFoodItem(food: Food): Promise<void> {
    await push(this.ref, food);
  }

  getFoodItems(): Observable<Food[]> {
    return this.foodItems$;
  }

  async updateFoodItem(key: string, value: Food): Promise<void> {
    await update(child(this.ref, key), value);
  }

  async removeFoodItems(foodItems: Food[]): Promise<void> {
    await Promise.all(foodItems.map((food) => this.removeFoodItem(food)));
  }

  public getSection(section: string): Observable<Food[]> {
    return this.foodItems$.pipe(
      map((foodItems) => foodItems.filter((item) => item.section === section))
    );
  }

  private async removeFoodItem(food: Food): Promise<void> {
    await remove(child(this.ref, food.$key));
  }
}
