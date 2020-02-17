import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Field, FieldType, FormInfo} from '../../api/form/form';
import {FormApiService} from '../../api/form/form-api.service';


@Component({
    selector: 'csc-firebase-form',
    templateUrl: './firebase-form.component.html',
    styleUrls: ['./firebase-form.component.scss']
})
export class FirebaseFormComponent implements OnInit, AfterViewInit, OnChanges {
    public form: FormGroup;
    @Input() formId: string;
    formInfo: FormInfo;
    @ViewChild('formElement') formElement;
    submitted = false;
    submitting = false;
    submitTried = false;

    constructor(private _formBuilder: FormBuilder, private _formApiService: FormApiService) {

    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    initForm() {
        const group = {};

        this.formInfo.fields.forEach((field) => {
            let value: any = '';
            if (field.type === FieldType.checkbox) {
                value = false;
            }
            const validators = [];
            if (field.required) {
                validators.push(Validators.required);
            }
            group[field.name] = [value, validators];
        });

        this.form = this._formBuilder.group(group);
    }

    ngOnInit() {
        this._formApiService.getFormOnce(this.formId).subscribe(value => {
            this.formInfo = value;
            if (value) {
                this.initForm();
            }
        });
    }

    ngAfterViewInit() {

    }

    isTextInput(field: Field) {
        return field.type === FieldType.text;
    }

    isRadioInput(field: Field) {
        return field.type === FieldType.radio;
    }

    isCheckboxInput(field: Field) {
        return field.type === FieldType.checkbox;
    }

    submitForm() {
        this.submitting = true;
        this.submitTried = true;
        if (this.form.status === 'VALID') {
            this._formApiService.addEntry(this.formId, this.form.value).then(() => {
                this.submitted = true;
            }).catch();
        } else {
            this.submitting = false;
        }
    }
}
