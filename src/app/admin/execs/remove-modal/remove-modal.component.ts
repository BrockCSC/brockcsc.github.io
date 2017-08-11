import { ExecApiService } from './../../../shared/api/exec/exec.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { Exec } from 'app/shared/api/exec/exec';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'csc-remove-exec-modal',
    templateUrl: './remove-modal.component.html',
    styleUrls: ['./remove-modal.component.scss']
})
export class RemoveModalComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    @Input() checkedExecs: Exec[] = [];
    @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _execApiService: ExecApiService) { }

    public removeExecs(): void {
        this._execApiService.removeExecs(this.checkedExecs)
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
