import { Component, OnInit, ViewChild } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { Event, CscFile } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';

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

    public update(): void {
        const key = this.editableEvent.$key;
        const data = this.form.value;
        data.datetime.timeStartTimestamp = new Date(`${data.datetime.date} ${data.datetime.timeStart}`).valueOf();
        data.datetime.timeEndTimestamp = new Date(`${data.datetime.date} ${data.datetime.timeEnd}`).valueOf();

        this._eventApiService.updateEvent(key, data)
            .then(() => {
                this.modal.close();
                this.form.reset();
            })
            .catch((error: Error) => {
                console.log('Error updating event');
                console.error(error);
            });
    }

    public hasImage(): boolean {
        return this.editableEvent !== undefined && this.editableEvent.image !== undefined;
    }

    public getImage(): CscFile[] {
        if (this.hasImage()) {
            return new Array(this.editableEvent.image);
        }
        return [];
    }

    public hasResources(): boolean {
        return this.editableEvent !== undefined && this.editableEvent.resources !== undefined;
    }

    public getResources(): CscFile[] {
        if (this.hasResources()) {
            return this.editableEvent.resources;
        }
        return [];
    }

}
