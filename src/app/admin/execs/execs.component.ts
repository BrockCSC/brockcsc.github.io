import { Component, OnInit } from '@angular/core';
import { Exec, ExecApiService } from 'app/shared/api';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { RemoveModalComponent } from './remove-modal/remove-modal.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { CheckboxComponent } from '../../shared/checkbox/checkbox.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { ButtonDirective } from '../../shared/button/button.directive';

@Component({
  selector: 'csc-execs',
  templateUrl: './execs.component.html',
  styleUrls: ['./execs.component.scss'],
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonComponent,
    NgFor,
    CheckboxComponent,
    AddModalComponent,
    RemoveModalComponent,
    EditModalComponent,
    AsyncPipe,
  ],
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
