import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { Exec, ExecApiService } from 'app/shared/api';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'csc-team-preview',
  templateUrl: './team-preview.component.html',
  styleUrls: ['./team-preview.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, MatTooltip, SpinnerComponent, AsyncPipe],
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
