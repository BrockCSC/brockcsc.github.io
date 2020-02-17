import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'csc-event-view',
    templateUrl: './event-view.component.html',
    styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
    @Input() event;

    constructor() {
    }

    ngOnInit(): void {
    }

    public getImageUrl(): string {
        const url = (path: string) => {
            return `url(${path})`;
        };
        if (this.event !== undefined && this.event.image !== undefined) {
            return url(this.event.image.url);
        }
        return url('/assets/placeholder.png'); // temp
    }

}
