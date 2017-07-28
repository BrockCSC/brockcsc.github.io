import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'button[csc-button]',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        console.log('a');
    }

}

