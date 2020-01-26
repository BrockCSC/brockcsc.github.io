import {Component, OnInit, Output, ViewChild, Input, EventEmitter} from '@angular/core';
import {FieldType, TextInput} from '../../api/form/form';

@Component({
    selector: 'csc-text-field-creator',
    templateUrl: './text-field-creator.component.html',
    styleUrls: ['./text-field-creator.component.scss']
})
export class TextFieldCreatorComponent implements OnInit {

    @Input() text: TextInput;
    @Output() textChange: EventEmitter<TextInput> = new EventEmitter();

    ngOnInit() {
    }
}
