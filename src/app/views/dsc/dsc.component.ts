import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { Card, CscEvent, DSCApiService, EventApiService } from 'app/shared/api';
import { Observable } from 'rxjs';
import { EventCardComponent } from '../../shared/event-card/event-card.component';

@Component({
  selector: 'csc-dsc',
  templateUrl: './dsc.component.html',
  styleUrls: ['./dsc.component.scss'],
  standalone: true,
  imports: [MatAnchor, NgIf, EventCardComponent, NgFor, MatCard, AsyncPipe],
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

  public getUrl(card: Card): string {
    const url = (path: string) => {
      return `${path}`;
    };
    if (card && card.img) {
      return url(card.img.url);
    }
    return url('/assets/placeholder.png'); // temp
  }
}
