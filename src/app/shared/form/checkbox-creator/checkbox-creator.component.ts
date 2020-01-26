import { CheckboxInput, FieldType } from '../../api/form/form';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'csc-checkbox-creator',
  templateUrl: './checkbox-creator.component.html',
  styleUrls: ['./checkbox-creator.component.scss']
})
export class CheckboxCreatorComponent implements OnInit {

  @Input() checkbox: CheckboxInput;
  @Output() checkboxChange: EventEmitter<CheckboxInput> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
