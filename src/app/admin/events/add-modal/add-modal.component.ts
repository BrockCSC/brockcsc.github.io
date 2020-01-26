import { Component, OnInit, ViewChild } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { Event } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
    selector: 'csc-add-modal',
    templateUrl: './add-modal.component.html',
    styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
    public form: FormGroup;
    @ViewChild('modal', {static: false}) modal: ModalComponent;

    constructor(private _eventApiService: EventApiService, private _formBuilder: FormBuilder) { }

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
            signupUrl: ''
        });
    }

    public add(): void {
        const val = this.form.value as Event;
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
