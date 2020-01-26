import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { Exec, ExecApiService } from 'app/shared/api';

@Component({
    selector: 'csc-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    execs: Observable<Exec[]>;
    prevExecs: Observable<Exec[]>;

    constructor(private _api: ExecApiService) { }

    ngOnInit() {
        this.execs = this._api.getCurrentExecs();
        this.prevExecs = this._api.getPreviousExecs();
    }
}

