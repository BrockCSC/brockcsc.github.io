import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextInput } from '../../api/form/form';

@Component({
  selector: 'csc-text-field-creator',
  templateUrl: './text-field-creator.component.html',
  styleUrls: ['./text-field-creator.component.scss'],
})
export class TextFieldCreatorComponent {
  @Input() text: TextInput;
  @Output() textChange: EventEmitter<TextInput> = new EventEmitter();
}
