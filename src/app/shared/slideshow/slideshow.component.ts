import { Component, ContentChildren, QueryList, AfterViewInit, Input, ViewChild, ElementRef } from "@angular/core";
import { SlideComponent } from './slides/slide.component';

@Component({
    selector: "csc-slideshow",
    templateUrl: "./slideshow.component.html",
    styleUrls: ["./slideshow.component.scss"]
})
export class SlideshowComponent implements AfterViewInit {
    // Delay in seconds
    @Input('delay')
    delay = 3;

    @ContentChildren(SlideComponent)
    slides: QueryList<SlideComponent>;

    @ViewChild('container')
    slidesContainer: ElementRef;

    // The active slide (index used for slides)
    private activeSlideIndex: number;

    // The current frame (for requestAnimationFrame).
    private frame: number;

    constructor() {
        this.activeSlideIndex = 0;
        this.frame = 0;
        this.updateActiveSlide = this.updateActiveSlide.bind(this);
    }

    ngAfterViewInit() {
        if (this.slides.length === 0) {
            console.error('csc-slideshow: found no <csc-slide> child elements!');
            return;
        }

        this.setActiveSlide();

        // Start animation
        requestAnimationFrame(this.updateActiveSlide);
    }

    /**
     * Goes through each slide and updates active property on slide.
     */
    private updateActiveSlide() {
        this.frame += 1;
        // Update every 300 frames.
        if (this.frame === this.delay * 100) {
            this.frame = 0;
            this.activeSlideIndex = (this.activeSlideIndex + 1) % this.slides.length;
            this.setActiveSlide();
        }

        requestAnimationFrame(this.updateActiveSlide);
    }

    private setActiveSlide() {
        this.slides.forEach((slide, index) => {
            slide.active = index === this.activeSlideIndex;
            if (slide.active) {
                this.slidesContainer.nativeElement.style.height = `${slide.getSlideHeight()}px`;
            }
        });
    }
}
