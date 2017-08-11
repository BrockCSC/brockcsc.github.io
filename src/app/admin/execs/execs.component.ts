import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Exec, ExecApiService } from 'app/shared/api';

@Component({
    selector: 'csc-execs',
    templateUrl: './execs.component.html',
    styleUrls: ['./execs.component.scss']
})
export class ExecsComponent implements OnInit {
    execs: FirebaseListObservable<Exec[]>;
    checkedExecs: Exec[] = [];

    constructor(private _api: ExecApiService) { }

    public resetCheckedExecs(): void {
        this.checkedExecs = [];
    }

    ngOnInit() {
        this.execs = this._api.getExecs();
    }

    public checked(mouseEvent: MouseEvent, exec: Exec) {
        const checkbox: HTMLInputElement = <HTMLInputElement> mouseEvent.target;
        if (checkbox.checked) {
            this.checkedExecs.push(exec);
        } else {
            const eventIndex = this.checkedExecs.indexOf(exec);
            this.checkedExecs.splice(eventIndex, 1);
        }
    }

    public getRemoveButtonText(): string {
        const base = `Remove ${this.checkedExecs.length} exec`;
        if (this.checkedExecs.length === 0) {
            return 'No executives selected';
        } else if (this.checkedExecs.length === 1) {
            return base;
        } else {
            return base + 's';
        }
    }

}
