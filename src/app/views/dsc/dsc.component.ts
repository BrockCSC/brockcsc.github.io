import { Component, OnInit } from '@angular/core';
import { Card, CscEvent, DSCApiService, EventApiService } from 'app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'csc-dsc',
  templateUrl: './dsc.component.html',
  styleUrls: ['./dsc.component.scss'],
})
export class DSCComponent implements OnInit {
  public cards: Observable<Card[]>;
  public nextEvent$: Observable<CscEvent>;

  constructor(
    private _DSCApiService: DSCApiService,
    private eventApiService: EventApiService
  ) {
    this.nextEvent$ = eventApiService.getNextDscEvent();
  }

  ngOnInit() {
    this.cards = this._DSCApiService.getCards();
  }
}
