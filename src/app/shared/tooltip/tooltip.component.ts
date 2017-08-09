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
    @ViewChild('tooltip') tooltip: ElementRef;

    $tooltip: any;

    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngAfterViewInit() {
        this.$tooltip = this.tooltip.nativeElement;
        const hostElement = this.document.getElementById(this.forId);

        if (!hostElement) {
            console.error('Tooltip: No host element found. Make sure id and forId exist and match on host element and tooltip');
            return;
        }

        const popper = new Popper(hostElement, this.$tooltip, {
            placement: 'right',
        });

        hostElement.addEventListener('mouseover', this.showToolTip);
        hostElement.addEventListener('mouseout', this.hideToolTip);
    }

    public showToolTip = (event: any) => {
        this.$tooltip.style.opacity = 1;
    }

    public hideToolTip = (event: any) => {
        this.$tooltip.style.opacity = 0;
    }
}
