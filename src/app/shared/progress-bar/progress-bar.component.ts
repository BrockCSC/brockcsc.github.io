import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'csc-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
    @Input() progress: number;
    @Input() color: string;

    constructor() {
        this.progress = 0;
        this.color = 'navy';
    }

    public floorProgress(): number {
        return Math.floor(this.progress);
    }

    ngOnInit() {
    }
}
