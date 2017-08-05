import { Component, OnInit, ViewChild } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { Event } from 'app/shared/api';
import { GUID } from 'app/shared/guid';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'csc-admin-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
    public eventForm: FormGroup;
    public events: FirebaseListObservable<Event[]>;
    @ViewChild('modalAdd') modalAdd: ModalComponent;
    @ViewChild('modalRemove') modalRemove: ModalComponent;
    public checkedEvents: Event[] = [];

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
            image: new FormControl({}),
            signupUrl: new FormControl('')
        });

        this.events = this._api.getEvents();
    }

    public openAddModal(): void {
        this.modalAdd.open();
    }

    public onSubmit(): void {
        const val = this.eventForm.value;
        val.timestamp = new Date(`${val.date} ${val.time}`).valueOf();
        this._api.addEvent(val).then((res) => {
            this.modalAdd.close();
            this.eventForm.reset();
        }).catch((error) => {
            console.error(error);
        });
    }

    public openRemoveModal(): void {
        this.modalRemove.open();
    }

    public removeEvents(): void {
        console.log(this.checkedEvents);

        this._api.deleteEvents(this.checkedEvents)
            .then(res => {
                this.checkedEvents = [];
                this.modalRemove.close();
            })
            .catch(error => {
                console.error('Error encountered', error);
            });
    }

    public checked(mouseEvent: MouseEvent, event: Event) {
        const checkbox: HTMLInputElement = <HTMLInputElement>mouseEvent.target;
        if (checkbox.checked) {
            this.checkedEvents.push(event);
        } else {
            const eventIndex = this.checkedEvents.indexOf(event);
            this.checkedEvents.splice(eventIndex, 1);
        }
    }

    public getRemoveButtonText(): string {
        const base = `Remove ${this.checkedEvents.length} event`;
        if (this.checkedEvents.length === 0) {
            return 'No events selected';
        } else if (this.checkedEvents.length === 1) {
            return base;
        } else {
            return base + 's';
        }
    }
}
