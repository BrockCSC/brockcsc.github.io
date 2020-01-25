import { AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Food, FoodApiService } from 'app/shared/api';

@Component({
    selector: 'csc-food',
    templateUrl: './foodItems.component.html',
    styleUrls: ['./foodItems.component.scss']
})
export class FoodItemsComponent implements OnInit {
    foodItems: AngularFireList<Food>;
    checkedFoodItems: Food[] = [];

    constructor(private _api: FoodApiService) {}

    public resetCheckedFoodItems(): void {
        this.checkedFoodItems = [];
    }

    ngOnInit() {
        this.foodItems = this._api.getFoodItems();
    }

    public checked(mouseEvent: MouseEvent, food: Food) {
        const checkbox: HTMLInputElement = <HTMLInputElement>mouseEvent.target;
        if (checkbox.checked) {
            this.checkedFoodItems.push(food);
        } else {
            const foodIndex = this.checkedFoodItems.indexOf(food);
            this.checkedFoodItems.splice(foodIndex, 1);
        }
    }
}
