import { Component, OnInit } from '@angular/core';
import { Exec, ExecApiService } from 'app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'csc-team-preview',
  templateUrl: './team-preview.component.html',
  styleUrls: ['./team-preview.component.scss'],
})
export class TeamPreviewComponent implements OnInit {
  execs: Observable<Exec[]>;
  prevExecs: Observable<Exec[]>;

  constructor(private _api: ExecApiService) {}

  ngOnInit() {
    this.execs = this._api.getCurrentExecs();
    this.prevExecs = this._api.getPreviousExecs();
  }
}
