import { Component, OnInit, ViewChild } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { Event } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { FirebaseListObservable } from 'angularfire2/database';


@Component({
    selector: 'csc-add-modal',
    templateUrl: './add-modal.component.html',
    styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
    public form: FormGroup;
    @ViewChild('modal') modal: ModalComponent;

    constructor(private _eventApiService: EventApiService, private _formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.form = this._formBuilder.group({
            title: new FormControl(''),
            presenter: new FormControl(''),
            description: new FormControl(''),
            date: new FormControl(''),
            time: new FormControl(''),
            location: new FormControl(''),
            resources: new FormControl([]),
            image: new FormControl({}),
            signupUrl: new FormControl('')
        });
    }

    public add(): void {
        const val = this.form.value;
        val.timestamp = new Date(`${val.date} ${val.time}`).valueOf();
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
