import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FoodApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ButtonDirective } from '../../../shared/button/button.directive';
import { ModalFooterComponent } from '../../../shared/modal/modal-footer/modal-footer.component';
import { InputContainerComponent } from '../../../shared/input-container/input-container.component';
import { ModalBodyComponent } from '../../../shared/modal/modal-body/modal-body.component';
import { ModalHeaderComponent } from '../../../shared/modal/modal-header/modal-header.component';
import { ModalComponent as ModalComponent_1 } from '../../../shared/modal/modal.component';

@Component({
  selector: 'csc-add-food-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
  standalone: true,
  imports: [
    ModalComponent_1,
    ModalHeaderComponent,
    ModalBodyComponent,
    ReactiveFormsModule,
    InputContainerComponent,
    ModalFooterComponent,
    ButtonDirective,
    ButtonComponent,
  ],
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
