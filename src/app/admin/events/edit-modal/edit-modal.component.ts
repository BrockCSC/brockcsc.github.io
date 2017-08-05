import { Component, OnInit, ViewChild } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { Event } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'csc-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
    public form: FormGroup;
    public editableEvent: Event;
    @ViewChild('modal') modal: ModalComponent;

    constructor(private _eventApiService: EventApiService, private _formBuilder: FormBuilder) { }

    public open(event: Event) {
        this.editableEvent = event;
        this.form.patchValue(this.editableEvent);
        this.modal.open();
    }

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

}
