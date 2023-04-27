import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckboxInput } from '../../api/form/form';

@Component({
  selector: 'csc-checkbox-creator',
  templateUrl: './checkbox-creator.component.html',
  styleUrls: ['./checkbox-creator.component.scss'],
})
export class CheckboxCreatorComponent {
  @Input() checkbox: CheckboxInput;
  @Output() checkboxChange: EventEmitter<CheckboxInput> = new EventEmitter();
}
