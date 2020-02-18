import { emptyForm, FormInfo, randomUid } from '../../../shared/api/form/form';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { CscEvent } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { FormApiService } from '../../../shared/api/form/form-api.service';

@Component({
    selector: 'csc-add-modal',
    templateUrl: './add-modal.component.html',
    styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
    public form: FormGroup;
    @ViewChild('modal') modal: ModalComponent;
    eventForm: FormInfo = emptyForm();
    includeForm = true;

    constructor(private _eventApiService: EventApiService, private _formBuilder: FormBuilder, private _formApiService: FormApiService) {
    }

    public ngOnInit(): void {
        this.form = this._formBuilder.group({
            title: '',
            presenter: '',
            description: '',
            datetime: this._formBuilder.group({
                date: '',
                timeStart: '',
                timeEnd: ''
            }),
            location: '',
            resources: new FormControl([]),
            image: {},
            signupUrl: '',
            gallery: new FormControl([]),
        });
    }

    public add(): void {
        const val = this.form.value as CscEvent;
        if (this.eventForm.fields.length === 0) {
            this.includeForm = false;
        }
        if (this.includeForm) {
            val.formId = randomUid(10);
            this._formApiService.setForm(this.eventForm, val.formId);
        }
        val.datetime.timeStartTimestamp = new Date(`${val.datetime.date} ${val.datetime.timeStart}`).valueOf();
        val.datetime.timeEndTimestamp = new Date(`${val.datetime.date} ${val.datetime.timeEnd}`).valueOf();
        this._eventApiService.addEvent(val).then((res) => {
            this.modal.close();
            this.form.reset();
        }).catch((error) => {
            console.error(error);
        });
    }

    public open(): void {
        this.modal.open();
    }

}
