import { DatePipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CscEvent, EventApiService } from 'app/shared/api';
import { EventDataService } from 'app/views/events/event-data.service';
import { take } from 'rxjs/operators';
import { GoogleFormComponent } from '../../../shared/form/google-form/google-form.component';
import { FirebaseFormComponent } from '../../../shared/form/firebase-form/firebase-form.component';
import { EventViewComponent } from '../../../shared/event-view/event-view.component';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  providers: [DatePipe],
  selector: 'csc-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    SpinnerComponent,
    EventViewComponent,
    FirebaseFormComponent,
    GoogleFormComponent,
  ],
})
export class EventComponent implements OnInit {
  event: CscEvent;
  error: string;
  loaded: boolean;
  id: string;

  constructor(
    private _eventDataService: EventDataService,
    private _eventApiService: EventApiService,
    private _route: ActivatedRoute
  ) {
    this.loaded = false;
  }

  ngOnInit() {
    this._route.params.pipe(take(1)).subscribe((params) => {
      this.id = params['id'];
      this.loadEvent();
    });
  }

  private loadEvent(): void {
    if (this._eventDataService.hasEvent()) {
      this.loaded = true;
      this.event = this._eventDataService.getEvent();
    } else {
      this._eventApiService.getEventByKeyOnce(this.id).subscribe({
        next: (event) => {
          this.loaded = true;
          if (event as any) {
            this.event = event as CscEvent;
          } else {
            this.error = `Event doesn't exist.`;
          }
        },
      });
    }
  }
}
