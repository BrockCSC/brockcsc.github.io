import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormApiService} from '../../shared/api/form/form-api.service';

@Component({
    selector: 'csc-form-responses',
    templateUrl: './form-responses.component.html',
    styleUrls: ['./form-responses.component.css']
})
export class FormResponsesComponent implements OnInit {

    @Input() formId: string;
    entries$: Observable<any[]>;
    entries: any[];
    cols = 0;
    keys: string[];
    descriptions = {};

    constructor(private _route: ActivatedRoute, private _formApiService: FormApiService) {
    }

    ngOnInit(): void {
        console.log(this.formId);
        this.entries$ = this._formApiService.getAllEntries(this.formId);
        this.entries$.subscribe(_entries => {
            this.entries = _entries;
            this.setMaxCol();
        });
        this._formApiService.getForm(this.formId).subscribe(value => {
            value.fields.forEach(field => {
                this.descriptions[field.name] = field.description;
            });
        });
    }


    setMaxCol() {
        const tempKeySet = {};
        this.entries.forEach(value => {
            const valKeys = Object.keys(value);
            this.cols = Math.max(valKeys.length, this.cols);
            valKeys.forEach(key => {
                tempKeySet[key] = true;
            });
        });
        this.keys = Object.keys(tempKeySet);
    }

}
