import {RadioInput, FieldType, RadioOption, TextInput} from '../../api/form/form';
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'csc-radio-creator',
    templateUrl: './radio-creator.component.html',
    styleUrls: ['./radio-creator.component.scss']
})
export class RadioCreatorComponent implements OnInit {

    @Input() radio: RadioInput;
    @Output() radioChange: EventEmitter<RadioInput> = new EventEmitter();
    newOptionName: string;

    constructor() {
    }

    ngOnInit() {
    }

    addOption() {
        if (!this.radio.options) {
            this.radio.options = [];
        }
        this.radio.options.push({name: this.newOptionName});
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
