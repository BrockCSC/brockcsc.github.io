import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInput } from '../../api/form/form';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { InputContainerComponent } from '../../input-container/input-container.component';

@Component({
  selector: 'csc-text-field-creator',
  standalone: true,
  templateUrl: './text-field-creator.component.html',
  imports: [
    InputContainerComponent,
    CheckboxComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class TextFieldCreatorComponent {
  @Input() text: TextInput;
  @Output() textChange: EventEmitter<TextInput> = new EventEmitter();
}
