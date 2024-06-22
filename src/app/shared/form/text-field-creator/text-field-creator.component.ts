import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextInput } from '../../api/form/form';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { InputContainerComponent } from '../../input-container/input-container.component';

@Component({
  selector: 'csc-text-field-creator',
  templateUrl: './text-field-creator.component.html',
  styleUrls: ['./text-field-creator.component.scss'],
  standalone: true,
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
