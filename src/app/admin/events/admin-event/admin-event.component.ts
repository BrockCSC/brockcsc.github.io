import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { take } from 'rxjs/operators';
import { CscEvent, EventApiService } from '../../../shared/api';
import { FormResponsesComponent } from '../../form-responses/form-responses.component';
import { EventViewComponent } from '../../../shared/event-view/event-view.component';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';

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
    this._route.params.pipe(take(1)).subscribe((params) => {
      this.id = params['id'];
    });
    this._eventApiService.getEventByKeyOnce(this.id).subscribe({
      next: (value) => {
        this.event = value;
      },
    });
  }
}
