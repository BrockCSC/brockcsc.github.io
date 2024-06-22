import { Component, Input } from '@angular/core';
import { ButtonDirective } from '../button/button.directive';
import { NgIf, NgFor, DatePipe } from '@angular/common';

const url = (path: string) => {
  return `url(${path})`;
};

@Component({
  selector: 'csc-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
  standalone: true,
  imports: [NgIf, ButtonDirective, NgFor, DatePipe],
})
export class EventViewComponent {
  @Input() event;

  public getImg(): string {
    return this.event?.image?.url;
  }

  public getDefault(): string {
    return !this.getImg() && 'url(assets/placeholder.png)';
  }

  public getImgUrl(): string {
    return this.getImg() && url(this.getImg());
  }
}
