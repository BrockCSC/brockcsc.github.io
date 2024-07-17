import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  QueryFn,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { listWithKeys } from '../util';
import { Food } from './food';
import { FoodApiService } from './food.service';

@Injectable({
  providedIn: 'root',
})
export class LegacyAngularFireFoodApiService extends FoodApiService {
  foodItems: AngularFireList<Food>;
  _path: string;

  constructor(private _db: AngularFireDatabase) {
    super();
    this._path = '/food';
    this.foodItems = this._db.list(this._path, (ref) => {
      return ref.orderByChild('section');
    });
  }

  async addFoodItem(food: Food): Promise<void> {
    await this.foodItems.push(food);
  }

  getFoodItems(): Observable<Food[]> {
    return listWithKeys(this.foodItems);
  }

  async updateFoodItem(key: string, value: Food): Promise<void> {
    await this.foodItems.update(key, value);
  }

  async removeFoodItems(foodItems: Food[]): Promise<void> {
    await Promise.all(foodItems.map((food) => this.removeFoodItem(food)));
  }

  async removeFoodItem(food: Food): Promise<void> {
    await this.removeFoodItemByKey(food.$key);
  }

  getSection(section: string): Observable<Food[]> {
    return this.queryFoodItems((ref) => {
      return ref.orderByChild('section').equalTo(section);
    });
  }

  private async removeFoodItemByKey(key: string): Promise<void> {
    await this.foodItems.remove(key);
  }

  private queryFoodItems(query: QueryFn): Observable<Food[]> {
    return listWithKeys(this._db.list(this._path, query));
  }
}
