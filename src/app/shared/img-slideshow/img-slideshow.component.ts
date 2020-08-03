import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'csc-img-slideshow',
  templateUrl: './img-slideshow.component.html',
  styleUrls: ['./img-slideshow.component.scss'],
})
export class ImgSlideshowComponent implements OnInit {
  @Input() srcs: string[];
  @Input() defaultImage: string;
  @Input() slideDelay = 8000; // ms
  currentSlide = 0;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.srcs?.length ?? 0;
    }, this.slideDelay);
  }

  getSrc(): string {
    return (
      this.currentSlide >= 0 &&
      this.currentSlide < (this.srcs?.length ?? 0) &&
      this.srcs?.[this.currentSlide]
    );
  }

  defaultUrl(): string {
    return `url(${this.defaultImage})`;
  }
}
