import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { EventApiService } from 'app/shared/api';
import { CscEvent } from 'app/shared/api';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { RemoveModalComponent } from './remove-modal/remove-modal.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { RouterLink } from '@angular/router';
import { CheckboxComponent } from '../../shared/checkbox/checkbox.component';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { ButtonDirective } from '../../shared/button/button.directive';

@Component({
  selector: 'csc-admin-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonComponent,
    NgFor,
    CheckboxComponent,
    RouterLink,
    AddModalComponent,
    RemoveModalComponent,
    EditModalComponent,
    AsyncPipe,
    DatePipe,
  ],
})
export class EventsComponent implements OnInit {
  public events: any;
  public checkedEvents: CscEvent[] = [];
  public editableEvent: CscEvent;

  constructor(
    private _api: EventApiService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.events = this._api.getEvents();
  }

  public resetCheckedEvents(): void {
    this.checkedEvents = [];
  }

  public checked(mouseEvent: MouseEvent, event: CscEvent) {
    const checkbox: HTMLInputElement = mouseEvent.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkedEvents.push(event);
    } else {
      const eventIndex = this.checkedEvents.indexOf(event);
      this.checkedEvents.splice(eventIndex, 1);
    }
  }

  public getRemoveButtonText(): string {
    const base = `Remove ${this.checkedEvents.length} event`;
    if (this.checkedEvents.length === 0) {
      return 'No events selected';
    } else if (this.checkedEvents.length === 1) {
      return base;
    } else {
      return base + 's';
    }
  }
}
