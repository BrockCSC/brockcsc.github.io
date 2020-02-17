import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Food, FoodApiService } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { AngularFireList } from '@angular/fire/database';

@Component({
    selector: 'csc-remove-food-modal',
    templateUrl: './remove-modal.component.html',
    styleUrls: ['./remove-modal.component.scss']
})
export class RemoveModalComponent implements OnInit {
    @ViewChild('modal') modal: ModalComponent;
    @Input() checkedFoodItems: Food[] = [];
    @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _execApiService: FoodApiService) { }

    public removeFoodItems(): void {
        this._execApiService.removeFoodItems(this.checkedFoodItems)
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
