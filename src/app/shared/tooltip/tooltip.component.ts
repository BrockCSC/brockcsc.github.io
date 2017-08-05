import { Component, OnInit, Input, Injectable, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import Popper from 'popper.js';

@Component({
  selector: 'csc-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements AfterViewInit {

    @Input('forId') forId: string;
    @Input('direction') direction = 'top';
    @ViewChild('tooltip') tooltip: ElementRef;
    @ViewChild('tooltipArrow') tooltipArrow: ElementRef;

    private _$tooltip: any;
    private _$tooltipArrow: any;

    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngAfterViewInit() {
        this._$tooltip = this.tooltip.nativeElement;
        this._$tooltipArrow = this.tooltipArrow.nativeElement;
        const hostElement = this.document.getElementById(this.forId);

        if (!hostElement) {
            console.error('Tooltip: No host element found. Make sure id and forId exist and match on host element and tooltip');
            return;
        }

        console.log(this.direction);
        this.setArrowDirection(this.direction);
        const popper = new Popper(hostElement, this._$tooltip, {
            placement: (this.direction as Popper.Placement),
        });

        hostElement.addEventListener('mouseover', this.showToolTip);
        hostElement.addEventListener('mouseout', this.hideToolTip);
    }

    public showToolTip = (event: any) => {
        this._$tooltip.style.opacity = 1;
    }

    public hideToolTip = (event: any) => {
        this._$tooltip.style.opacity = 0;
    }

    private setArrowDirection(direction: string = 'bottom') {
        const defaultBorder = `5px solid transparent`;
        const setBorder = `5px solid ${this._$tooltip.style.backgroundColor}`;

        if (direction === 'top' || direction === 'bottom') {
            this._$tooltipArrow.style.borderLeft = defaultBorder;
            this._$tooltipArrow.style.borderRight = defaultBorder;
        } else {
            this._$tooltipArrow.style.borderTop = defaultBorder;
            this._$tooltipArrow.style.borderBottom = defaultBorder;
        }

        switch (direction) {
            case 'top': {
                this._$tooltipArrow.style.top = '100%';
                this._$tooltipArrow.style.left = '50%';
                this._$tooltipArrow.style.borderTop = setBorder;
                break;
            }

            case 'right': {
                this._$tooltipArrow.style.top = '50%';
                this._$tooltipArrow.style.right = '100%';
                this._$tooltipArrow.style.borderRight = setBorder;
                break;
            }

            case 'left': {
                this._$tooltipArrow.style.top = '50%';
                this._$tooltipArrow.style.left = '100%';
                this._$tooltipArrow.style.borderLeft = setBorder;
                break;
            }

            case 'bottom': {
                this._$tooltipArrow.style.bottom = '100%';
                this._$tooltipArrow.style.left = '50%';
                this._$tooltipArrow.style.borderBottom = setBorder;
                break;
            }
        }
    }
}
