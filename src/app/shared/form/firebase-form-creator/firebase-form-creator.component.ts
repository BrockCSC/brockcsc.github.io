import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CheckboxInput,
  Field,
  FieldType,
  FormInfo,
  RadioInput,
  TextInput,
  emptyCheckboxInput,
  emptyRadioInput,
  emptyTextInput,
} from '../../api/form/form';

@Component({
  selector: 'csc-firebase-form-creator',
  templateUrl: './firebase-form-creator.component.html',
  styleUrls: ['./firebase-form-creator.component.scss'],
})
export class FirebaseFormCreatorComponent {
  @Input() formInfo: FormInfo = { fields: [] };
  @Output() formInfoChange: EventEmitter<FormInfo> =
    new EventEmitter<FormInfo>();
  fieldTypes = [FieldType.checkbox, FieldType.radio, FieldType.text];
  selectedNewFieldType;

  constructor() {}

  addRadioField() {
    this.formInfo.fields.push(emptyRadioInput() as RadioInput);
  }

  addTextField() {
    this.formInfo.fields.push(emptyTextInput() as TextInput);
  }

  addCheckboxField() {
    this.formInfo.fields.push(emptyCheckboxInput() as CheckboxInput);
  }

  addNewField() {
    switch (this.selectedNewFieldType) {
      case FieldType.checkbox:
        this.addCheckboxField();
        break;
      case FieldType.radio:
        this.addRadioField();
        break;
      case FieldType.text:
        this.addTextField();
        break;
    }
  }

  isTextInput(field: Field): boolean {
    return field.type === FieldType.text;
  }

  isCheckboxInput(field: Field): boolean {
    return field.type === FieldType.checkbox;
  }

  isRadioInput(field: Field): boolean {
    return field.type === FieldType.radio;
  }

  removeField(field) {
    this.formInfo.fields.splice(this.formInfo.fields.indexOf(field), 1);
  }
}
