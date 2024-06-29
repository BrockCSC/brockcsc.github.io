import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CscEvent, EventApiService } from '../../../shared/api';
import { EventViewComponent } from '../../../shared/event-view/event-view.component';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { FormResponsesComponent } from '../../form-responses/form-responses.component';

@Component({
  selector: 'csc-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['./admin-event.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    SpinnerComponent,
    EventViewComponent,
    FormResponsesComponent,
  ],
})
export class AdminEventComponent implements OnInit {
  id: string;
  event: CscEvent;

  constructor(
    private _route: ActivatedRoute,
    private _eventApiService: EventApiService
  ) {}

  ngOnInit(): void {
    firstValueFrom(this._route.params).then((params) => {
      this.id = params['id'];
    });
    firstValueFrom(this._eventApiService.getEventByKey(this.id)).then(
      (value) => {
        this.event = value;
      }
    );
  }
}
