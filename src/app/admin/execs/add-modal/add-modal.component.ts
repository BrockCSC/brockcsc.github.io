import { Component, OnInit, ViewChild } from '@angular/core';
import { ExecApiService } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';


@Component({
    selector: 'csc-add-exec-modal',
    templateUrl: './add-modal.component.html',
    styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
    public form: FormGroup;
    @ViewChild('modal') modal: ModalComponent;

    constructor(private _execApiService: ExecApiService, private _formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.form = this._formBuilder.group({
            name: new FormControl(''),
            title: new FormControl('Executive'),
            description: new FormControl(''),
            isCurrentExec: new FormControl(true),
            image: new FormControl({}),
        });
    }

    public add(): void {
        const val = this.form.value;
        this._execApiService.addExec(val).then((res) => {
            this.modal.close();
            this.form.reset();
        });
    }

    public open(): void {
        this.modal.open();
    }

}
