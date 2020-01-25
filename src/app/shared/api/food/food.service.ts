import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, QueryFn } from 'angularfire2/database';
import { Food } from './food';

@Injectable()
export class FoodApiService {
    foodItems: AngularFireList<Food>;
    _path: string;

    constructor(
        private _db: AngularFireDatabase
    ) {
        this._path = '/food';
        this.foodItems = this._db.list(this._path, ref => {
            return ref.orderByChild('section');
        });
    }

    public addFoodItem(food: Food): Promise<Food> {
        return this.foodItems.push(food) as any as Promise<Food>;
    }

    public getFoodItems(): AngularFireList<Food> {
        return this.foodItems;
    }

    public updateFoodItem(key: string, value: Food): Promise<void> {
        return this.foodItems.update(key, value);
    }

    public removeFoodItems(foodItems: Food[]): Promise<void[]> {
        return Promise.all(foodItems.map(food => this.removeFoodItem(food)));
    }

    public removeFoodItem(food: Food): Promise<void> {
        return this.removeFoodItemByKey(food.$key);
    }

    public removeFoodItemByKey(key: string): Promise<void> {
        return this.foodItems.remove(key);
    }

    public queryFoodItems(query: QueryFn): AngularFireList<Food[]> {
        return this._db.list(this._path, query);
    }
}
