import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxInput } from '../../api/form/form';
import { InputContainerComponent } from '../../input-container/input-container.component';

@Component({
  selector: 'csc-checkbox-creator',
  standalone: true,
  imports: [InputContainerComponent, ReactiveFormsModule, FormsModule],
  template: `
    <csc-input-container
      label="Checkbox label"
      class="col-12"
      labelLocation="top"
    >
      <input [(ngModel)]="checkbox.description" />
    </csc-input-container>
  `,
})
export class CheckboxCreatorComponent {
  @Input() checkbox: CheckboxInput;
  @Output() checkboxChange: EventEmitter<CheckboxInput> = new EventEmitter();
}
