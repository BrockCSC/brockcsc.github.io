import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Food, FoodApiService } from 'app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'csc-food',
  templateUrl: './foodItems.component.html',
  styleUrls: ['./foodItems.component.scss'],
})
export class FoodItemsComponent implements OnInit {
  foodItems: Observable<Food[]>;
  checkedFoodItems: Food[] = [];

  constructor(private _api: FoodApiService) {}

  public resetCheckedFoodItems(): void {
    this.checkedFoodItems = [];
  }

  ngOnInit() {
    this.foodItems = this._api.getFoodItems();
  }

  public checked(mouseEvent: MouseEvent, food: Food) {
    const checkbox: HTMLInputElement = mouseEvent.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkedFoodItems.push(food);
    } else {
      const foodIndex = this.checkedFoodItems.indexOf(food);
      this.checkedFoodItems.splice(foodIndex, 1);
    }
  }
}
