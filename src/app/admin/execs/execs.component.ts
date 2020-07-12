import { Component, OnInit } from '@angular/core';
import { Exec, ExecApiService } from 'app/shared/api';

@Component({
  selector: 'csc-execs',
  templateUrl: './execs.component.html',
  styleUrls: ['./execs.component.scss'],
})
export class ExecsComponent implements OnInit {
  execs: any;
  previousExecs: any;
  checkedExecs: Exec[] = [];

  constructor(private _api: ExecApiService) {}

  public resetCheckedExecs(): void {
    this.checkedExecs = [];
  }

  ngOnInit() {
    this.execs = this._api.getCurrentExecs();
    this.previousExecs = this._api.getPreviousExecs();
  }

  public checked(mouseEvent: MouseEvent, exec: Exec) {
    const checkbox: HTMLInputElement = mouseEvent.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkedExecs.push(exec);
    } else {
      const eventIndex = this.checkedExecs.indexOf(exec);
      this.checkedExecs.splice(eventIndex, 1);
    }
  }
}
