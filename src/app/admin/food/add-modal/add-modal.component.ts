import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodApiService } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
    selector: 'csc-add-food-modal',
    templateUrl: './add-modal.component.html',
    styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
    public form: FormGroup;
    @ViewChild('modal') modal: ModalComponent;

    constructor(private _foodApiService: FoodApiService, private _formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.form = this._formBuilder.group({
            name: new FormControl(''),
            section: new FormControl('Food'),
            price: new FormControl(0)
        });
    }

    public add(): void {
        const val = this.form.value;
        this._foodApiService.addFoodItem(val).then((res) => {
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
