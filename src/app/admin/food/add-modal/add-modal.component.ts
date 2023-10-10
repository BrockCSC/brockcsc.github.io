import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FoodApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'csc-add-food-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  public form: UntypedFormGroup;
  @ViewChild('modal') modal: ModalComponent;

  constructor(
    private _foodApiService: FoodApiService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: new UntypedFormControl(''),
      section: new UntypedFormControl('Food'),
      price: new UntypedFormControl(0),
    });
  }

  public add(): void {
    const val = this.form.value;
    this._foodApiService
      .addFoodItem(val)
      .then(() => {
        this.modal.close();
        this.form.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public open(): void {
    this.modal.open();
  }
}
