import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, NgModule, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Exec, ExecApiService } from 'app/shared/api';
import { Observable } from 'rxjs';
import { TeamExecInfoComponent } from './team-exec-info/team-exec-info.component';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'csc-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations: [
    trigger('showPrevExecsAnim', [
      state(
        'show',
        style({
          overflow: 'hidden',
          opacity: 1,
          height: '*',
        })
      ),
      state(
        'hide',
        style({
          overflow: 'hidden',
          opacity: 0,
          height: '0px',
        })
      ),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in')),
    ]),
  ],
  standalone: true,
  imports: [NgFor, TeamExecInfoComponent, AsyncPipe],
})
export class TeamComponent implements OnInit {
  execs: Observable<Exec[]>;
  prevExecs: Observable<Exec[]>;
  showPrevExecs = false;
  constructor(private _api: ExecApiService) {}

  ngOnInit() {
    this.execs = this._api.getCurrentExecs();
    this.prevExecs = this._api.getPreviousExecs();
  }

  get prevDivState() {
    return this.showPrevExecs ? 'show' : 'hide';
  }

  flipShowPrevExecs() {
    this.showPrevExecs = !this.showPrevExecs;
  }
}
