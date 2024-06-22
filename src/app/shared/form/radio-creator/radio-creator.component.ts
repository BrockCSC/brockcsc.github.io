import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadioInput, RadioOption } from '../../api/form/form';
import { ButtonDirective } from '../../button/button.directive';
import { ButtonComponent } from '../../button/button.component';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { InputContainerComponent } from '../../input-container/input-container.component';

@Component({
  selector: 'csc-radio-creator',
  templateUrl: './radio-creator.component.html',
  styleUrls: ['./radio-creator.component.scss'],
  standalone: true,
  imports: [
    InputContainerComponent,
    CheckboxComponent,
    ReactiveFormsModule,
    FormsModule,
    NgFor,
    ButtonComponent,
    ButtonDirective,
  ],
})
export class RadioCreatorComponent {
  @Input() radio: RadioInput;
  @Output() radioChange: EventEmitter<RadioInput> = new EventEmitter();
  newOptionName: string;

  addOption() {
    if (!this.radio.options) {
      this.radio.options = [];
    }
    this.radio.options.push({ name: this.newOptionName });
    this.newOptionName = '';
  }

  deleteOption(option: RadioOption) {
    this.radio.options.forEach((value, index) => {
      if (value.name === option.name) {
        this.radio.options.splice(index, 1);
        return;
      }
    });
  }
}
