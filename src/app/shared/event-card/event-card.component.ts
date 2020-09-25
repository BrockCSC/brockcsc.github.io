import { Component, Input, OnInit } from '@angular/core';
import { CscEvent } from 'app/shared/api';

@Component({
  selector: 'csc-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() event: CscEvent;
  @Input() next = false;
  @Input() imgHeight = '10rem';
  @Input() theme: 'grey' | 'google' = 'grey';

  constructor() {}

  ngOnInit(): void {}

  getImage(): string {
    const url = this.event?.image?.url;
    return `url(${url ? url : 'assets/placeholder.png'})`;
  }
}
