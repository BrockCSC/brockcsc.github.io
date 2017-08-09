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

        this.setArrowDirection(this.direction);

        const popper = new Popper(hostElement, this._$tooltip, {
            placement: (this.direction as Popper.Placement),
            onCreate: (data) => {
                hostElement.addEventListener('mouseover', this.showToolTip);
                hostElement.addEventListener('mouseout', this.hideToolTip);
            },
            onUpdate: (data) => {
                this.resetTooltipStyles();
                this.setArrowDirection(data.placement);
            },
        });
    }

    public showToolTip = (_: any) => {
        this._$tooltip.style.opacity = 1;
    }

    public hideToolTip = (_: any) => {
        this._$tooltip.style.opacity = 0;
    }

    private capitalize = (text: string) =>
        text.charAt(0).toUpperCase() + text.slice(1);


    private resetTooltipStyles() {
        const directions = ['top', 'left', 'bottom', 'right'];
        directions.forEach(direction => {
            this._$tooltipArrow.style[`${direction}`] = '';
            this._$tooltipArrow.style[`border${this.capitalize(direction)}`] = '';
        });
    }

    private setArrowDirection(direction: string = 'bottom') {
        const defaultBorder = `5px solid transparent`;
        const setBorder = `5px solid ${this._$tooltip.style.backgroundColor}`;

        if (direction === 'top' || direction === 'bottom') {
            this._$tooltipArrow.style.left = '50%';
            this._$tooltipArrow.style.borderLeft = defaultBorder;
            this._$tooltipArrow.style.borderRight = defaultBorder;
        } else {
            this._$tooltipArrow.style.top = '50%';
            this._$tooltipArrow.style.borderTop = defaultBorder;
            this._$tooltipArrow.style.borderBottom = defaultBorder;
        }

        this._$tooltipArrow.style[`${direction}`] = '100%';
        this._$tooltipArrow.style[`border${this.capitalize(direction)}`] = setBorder;
    }

}
