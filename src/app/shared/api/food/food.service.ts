import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  QueryFn,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { listWithKeys } from '../util';
import { Food } from './food';

@Injectable()
export class FoodApiService {
  foodItems: AngularFireList<Food>;
  _path: string;

  constructor(private _db: AngularFireDatabase) {
    this._path = '/food';
    this.foodItems = this._db.list(this._path, (ref) => {
      return ref.orderByChild('section');
    });
  }

  public async addFoodItem(food: Food): Promise<void> {
    await this.foodItems.push(food);
  }

  public getFoodItems(): Observable<Food[]> {
    return listWithKeys(this.foodItems);
  }

  public updateFoodItem(key: string, value: Food): Promise<void> {
    return this.foodItems.update(key, value);
  }

  public removeFoodItems(foodItems: Food[]): Promise<void[]> {
    return Promise.all(foodItems.map((food) => this.removeFoodItem(food)));
  }

  public removeFoodItem(food: Food): Promise<void> {
    return this.removeFoodItemByKey(food.$key);
  }

  public removeFoodItemByKey(key: string): Promise<void> {
    return this.foodItems.remove(key);
  }

  public queryFoodItems(query: QueryFn): Observable<Food[]> {
    return listWithKeys(this._db.list(this._path, query));
  }
}
