import { Component, Input } from '@angular/core';
import { CscEvent } from 'app/shared/api';

@Component({
  selector: 'csc-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent {
  @Input() event: CscEvent;
  @Input() next = false;
  @Input() imgHeight = '10rem';
  @Input() theme: 'grey' | 'google' = 'grey';

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
