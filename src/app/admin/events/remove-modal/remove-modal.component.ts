import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { Event } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
    selector: 'csc-remove-modal',
    templateUrl: './remove-modal.component.html',
    styleUrls: ['./remove-modal.component.scss']
})
export class RemoveModalComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    @Input() checkedEvents: Event[] = [];
    @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _eventApiService: EventApiService) { }

    public removeEvents(): void {
        this._eventApiService.removeEvents(this.checkedEvents)
            .then(res => {
                this.onDelete.emit();
                this.modal.close();
            })
            .catch(error => {
                console.error('Error encountered', error);
            });
    }

    public open(): void {
        this.modal.open();
    }

    public ngOnInit(): void {

    }
}
