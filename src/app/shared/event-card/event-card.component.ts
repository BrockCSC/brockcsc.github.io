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

  getImg(): string {
    return this.event?.image?.url;
  }

  getImgBg(): string {
    return this.getImg() && `url(${this.getImg()})`;
  }

  getDefaultImg(): string {
    return !this.getImg() && 'url(assets/placeholder.png)';
  }
}
