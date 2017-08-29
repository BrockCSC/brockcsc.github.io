import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Query } from 'angularfire2/interfaces';
import { Food } from './food';

@Injectable()
export class FoodApiService {
    foodItems: FirebaseListObservable<Food[]>;
    _path: string;

    constructor(
        private _db: AngularFireDatabase
    ) {
        this._path = '/food';
        this.foodItems = this._db.list(this._path, {
            query: {
                orderByChild: 'section'
            }
        });
    }

    public addFoodItem(food: Food): firebase.Thenable<Food> {
        return this.foodItems.push(food);
    }

    public getFoodItems(): FirebaseListObservable<Food[]> {
        return this.foodItems;
    }

    public updateFoodItem(key: string, value: Food): firebase.Promise<void> {
        return this.foodItems.update(key, value);
    }

    public removeFoodItems(foodItems: Food[]): Promise<void[]> {
        return Promise.all(foodItems.map(food => this.removeFoodItem(food)));
    }

    public removeFoodItem(food: Food): firebase.Promise<void> {
        return this.removeFoodItemByKey(food.$key);
    }

    public removeFoodItemByKey(key: string): firebase.Promise<void> {
        return this.foodItems.remove(key);
    }
}
