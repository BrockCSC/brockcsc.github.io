import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckboxInput } from '../../api/form/form';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputContainerComponent } from '../../input-container/input-container.component';

@Component({
  selector: 'csc-checkbox-creator',
  templateUrl: './checkbox-creator.component.html',
  styleUrls: ['./checkbox-creator.component.scss'],
  standalone: true,
  imports: [InputContainerComponent, ReactiveFormsModule, FormsModule],
})
export class CheckboxCreatorComponent {
  @Input() checkbox: CheckboxInput;
  @Output() checkboxChange: EventEmitter<CheckboxInput> = new EventEmitter();
}
