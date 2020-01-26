import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ImageStyleConfig } from 'app/shared/imageConfig';

@Component({
    selector: 'csc-img',
    templateUrl: './img.component.html',
    styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, AfterViewInit {
    @Input() src;
    @Input() data;
    @Input() width = 0;
    @Input() height = 0;
    @Input() alt = '';
    @Input() styleConfig: ImageStyleConfig;
    @ViewChild('img') img: ElementRef;
    @ViewChild('container') container: ElementRef;
    private loaded = false;

    constructor(private _sanitizer: DomSanitizer) { }

    ngOnInit() {
 
    }

    ngAfterViewInit() {
        this.initStyles();
        this.initObserver();
    }

    private initStyles(): void {
        if (this.width !== 0 && this.height !== 0) {
            this.img.nativeElement.style.position = 'absolute';
        }
        const containerStyle = {
            'padding-top': (this.height / this.width * 100) + '%',
            'background': this.getUrl()
        };
        this.setStyles(containerStyle, this.container);

        if (this.styleConfig !== undefined) {
            const imgStyles = this.styleConfig.image;
            const imgContainerStyles = this.styleConfig.container;
            this.setStyles(imgStyles, this.img);
            this.setStyles(imgContainerStyles, this.container);
        }
    }

    private initObserver(): void {
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries, observer) => {
                const entry = entries[0];
                if (this.loaded) {
                    return;
                }
                if (entry.intersectionRatio > 0) {
                    this.img.nativeElement.onload = () => {
                        this.img.nativeElement.className += 'loaded';
                        this.loaded = true;
                        io.unobserve(this.container.nativeElement);
                    };
                    this.img.nativeElement.src = this.src;
                }
            }, { rootMargin: '50px' });

            io.observe(this.container.nativeElement);
        } else {
            this.img.nativeElement.onload = () => {
                this.img.nativeElement.className += 'loaded';
                this.loaded = true;
            };
            this.img.nativeElement.src = this.src;
        }
    }

    private setStyles(styles = {}, element: ElementRef): void {
        Object.keys(styles).forEach(key => {
            const style = styles[key];
            element.nativeElement.style[key] = styles[key];
        });
    }

    private getUrl(): string {
        return this.data !== undefined ? `url('${this.data}')` : '';
    }
}
