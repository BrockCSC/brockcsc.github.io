import { Component, Input } from '@angular/core';

const url = (path: string) => {
  return `url(${path})`;
};

@Component({
  selector: 'csc-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
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
