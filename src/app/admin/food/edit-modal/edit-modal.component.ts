import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Food, FoodApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'csc-edit-food-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  public form: UntypedFormGroup;
  public editableFood: Food;
  @ViewChild('modal') modal: ModalComponent;

  constructor(
    private _foodApiService: FoodApiService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  public open(food: Food) {
    this.editableFood = food;
    this.form.patchValue(this.editableFood);
    this.modal.open();
  }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: new UntypedFormControl(''),
      section: new UntypedFormControl('Food'),
      price: new UntypedFormControl(0),
    });
  }

  public update(): void {
    const key = this.editableFood.$key;
    const data = this.form.value;
    this._foodApiService
      .updateFoodItem(key, data)
      .then(() => {
        this.modal.close();
        this.form.reset();
      })
      .catch((error: Error) => {
        console.log('Error updating exec');
        console.error(error);
      });
  }
}
