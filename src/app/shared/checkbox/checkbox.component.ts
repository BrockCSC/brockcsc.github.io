import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { GUID } from 'app/shared/guid';

@Component({
    selector: 'csc-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
    @Input() label = null;
    @ViewChild('checkbox', {static: true}) inputParent: ElementRef;
    public _id: string = GUID.newGuid();
    public _defaultLabel = '&#8203;'; // no whitespace empty character
    public input: HTMLInputElement;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.input = this.elementRef.nativeElement.querySelector('.csc-checkbox>input');
        this.input.className += ' magic-checkbox';
        this.input.id = this._id;
    }
}
