import { Component, OnInit } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'csc-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    eventForm: FormGroup;

    constructor(private _api: EventApiService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.eventForm = this.formBuilder.group({
            title: new FormControl('title'),
            presenter: new FormControl('presenter'),
            description: new FormControl('description'),
            date: new FormControl('date'),
            time: new FormControl('time'),
            location: new FormControl('location'),
            resources: new FormControl([]),
            image: new FormControl([])
        });
    }

    public onSubmit(): void {
        const val = this.eventForm.value;
        console.log(val);
        this._api.addEvent(val);
    }

}
