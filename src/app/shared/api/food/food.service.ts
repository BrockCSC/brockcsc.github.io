import { QueryFn } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Food } from './food';

export abstract class FoodApiService {
  abstract addFoodItem(food: Food): Promise<void>;
  abstract getFoodItems(): Observable<Food[]>;
  abstract updateFoodItem(key: string, value: Food): Promise<void>;
  abstract removeFoodItems(foodItems: Food[]): Promise<void>;
  abstract getSection(section: string): Observable<Food[]>;
}
