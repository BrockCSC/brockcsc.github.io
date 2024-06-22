import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'csc-img-slideshow',
  templateUrl: './img-slideshow.component.html',
  styleUrls: ['./img-slideshow.component.scss'],
  animations: [
    trigger('fade', [
      state(
        'show',
        style({
          opacity: 1,
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      transition('show => hide', [animate('2s')]),
      transition('hide => show', [animate('2s')]),
    ]),
  ],
  standalone: true,
  imports: [NgFor],
})
export class ImgSlideshowComponent implements OnInit {
  @Input() srcs: string[];
  @Input() defaultImage: string;
  @Input() slideDelay = 8000; // ms
  currentSlide = 0;
  loadedImgs: { [key: string]: boolean } = {};
  firstLoad = false;

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

  loaded(src: string) {
    this.loadedImgs[src] = true;
    if (!this.firstLoad) {
      setTimeout(() => {
        this.firstLoad = true;
      }, 2000);
    }
  }

  fadeIn(src: string) {
    return this.getSrc() === src && this.loadedImgs[src];
  }
}
