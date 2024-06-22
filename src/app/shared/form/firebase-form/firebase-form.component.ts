import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AnyCastPipe } from '../../any-cast.pipe';
import { Field, FieldType, FormInfo } from '../../api/form/form';
import { FormApiService } from '../../api/form/form-api.service';
import { ButtonComponent } from '../../button/button.component';
import { ButtonDirective } from '../../button/button.directive';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { InputContainerComponent } from '../../input-container/input-container.component';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'csc-firebase-form',
  standalone: true,
  templateUrl: './firebase-form.component.html',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgFor,
    InputContainerComponent,
    CheckboxComponent,
    ButtonComponent,
    ButtonDirective,
    SpinnerComponent,
    AnyCastPipe,
  ],
})
export class FirebaseFormComponent implements OnInit {
  public form: UntypedFormGroup;
  @Input() formId: string;
  formInfo: FormInfo;
  @ViewChild('formElement') formElement;
  submitted = false;
  submitting = false;
  submitTried = false;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _formApiService: FormApiService
  ) {}

  initForm() {
    const group = {};

    this.formInfo.fields.forEach((field) => {
      let value: any = '';
      if (field.type === FieldType.checkbox) {
        value = false;
      }
      const validators = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      group[field.name] = [value, validators];
    });

    this.form = this._formBuilder.group(group);
  }

  ngOnInit() {
    this._formApiService.getFormOnce(this.formId).subscribe({
      next: (value) => {
        this.formInfo = value;
        if (value) {
          this.initForm();
        }
      },
    });
  }

  isTextInput(field: Field) {
    return field.type === FieldType.text;
  }

  isRadioInput(field: Field) {
    return field.type === FieldType.radio;
  }

  isCheckboxInput(field: Field) {
    return field.type === FieldType.checkbox;
  }

  submitForm() {
    this.submitting = true;
    this.submitTried = true;
    if (this.form.status === 'VALID') {
      this._formApiService
        .addEntry(this.formId, this.form.value)
        .then(() => {
          this.submitted = true;
        })
        .catch();
    } else {
      this.submitting = false;
    }
  }
}
