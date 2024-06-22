import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Food, FoodApiService } from 'app/shared/api';
import { Observable } from 'rxjs';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { RemoveModalComponent } from './remove-modal/remove-modal.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { CheckboxComponent } from '../../shared/checkbox/checkbox.component';
import { NgFor, AsyncPipe, CurrencyPipe } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { ButtonDirective } from '../../shared/button/button.directive';

@Component({
  selector: 'csc-food',
  templateUrl: './foodItems.component.html',
  styleUrls: ['./foodItems.component.scss'],
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonComponent,
    NgFor,
    CheckboxComponent,
    AddModalComponent,
    RemoveModalComponent,
    EditModalComponent,
    AsyncPipe,
    CurrencyPipe,
  ],
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
