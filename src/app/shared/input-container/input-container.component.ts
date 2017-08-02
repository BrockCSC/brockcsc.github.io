import { Component, OnInit, Input , ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'csc-input-container',
    templateUrl: './input-container.component.html',
    styleUrls: ['./input-container.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InputContainerComponent implements OnInit {
    @Input() label: string;
    @Input() colsLabel = 3;
    @Input() colsInput = 9;

    constructor() { }

    ngOnInit() { }
}
