import { Component, OnInit, ViewChild } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';

import { GUID } from 'app/shared/guid';

@Component({
    selector: 'csc-admin-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
    public eventForm: FormGroup;
    @ViewChild('modalAdd') modalAdd: ModalComponent;

    constructor(private _api: EventApiService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.eventForm = this.formBuilder.group({
            title: new FormControl(''),
            presenter: new FormControl(''),
            description: new FormControl(''),
            date: new FormControl(''),
            time: new FormControl(''),
            location: new FormControl(''),
            resources: new FormControl([]),
            image: new FormControl({})
        });
    }

    public openModal(): void {
        this.modalAdd.open();
    }


    public onSubmit(): void {
        const val = this.eventForm.value;
        this._api.addEvent(val).then((res) => {
            this.modalAdd.close();
            this.eventForm.reset();
        }).catch((error) => {
            console.error(error);
        });
    }
}
