import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckboxInput, FieldType } from '../../api/form/form';

@Component({
  selector: 'csc-checkbox-creator',
  templateUrl: './checkbox-creator.component.html',
  styleUrls: ['./checkbox-creator.component.scss'],
})
export class CheckboxCreatorComponent implements OnInit {
  @Input() checkbox: CheckboxInput;
  @Output() checkboxChange: EventEmitter<CheckboxInput> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
