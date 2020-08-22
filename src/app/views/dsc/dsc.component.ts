import { Component, OnInit } from '@angular/core';
import { Card, DSCApiService } from 'app/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'csc-dsc',
  templateUrl: './dsc.component.html',
  styleUrls: ['./dsc.component.scss'],
})
export class DSCComponent implements OnInit {
  public cards: Observable<Card[]>;

  constructor(private _DSCApiService: DSCApiService) {}

  ngOnInit() {
    this.cards = this._DSCApiService.getCards();
  }
}
