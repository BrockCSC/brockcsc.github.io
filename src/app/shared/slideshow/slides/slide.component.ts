import { Component, ViewChild, TemplateRef, ElementRef } from "@angular/core";

@Component({
    selector: "csc-slide",
    templateUrl: "./slide.component.html",
    styleUrls: ["./slide.component.scss"]
})
export class SlideComponent {
    @ViewChild(TemplateRef) template: TemplateRef<any>;
    @ViewChild('container') slideContainer: ElementRef;

    // Is the slide active or not
    active = false;

    constructor() {}

    /**
     * Used for calculating the height of the relative container view for the slide.
     * @returns {number} - Get's the slides offset height (height+padding).
     */
    getSlideHeight(): number {
        return this.slideContainer.nativeElement.offsetHeight;
    }
}
