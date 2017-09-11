import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'csc-img',
    templateUrl: './img.component.html',
    styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {
    @Input() src;
    @Input() data;
    @Input() width = 0;
    @Input() height = 0;
    @Input() alt = '';
    @ViewChild('img') img: ElementRef;
    @ViewChild('parent') parent: ElementRef;
    private loaded = false;

    constructor(private _sanitizer: DomSanitizer) { }

    ngOnInit() {
        if (this.width !== 0 && this.height !== 0) {
            this.img.nativeElement.style.position = 'absolute';
        }
        const io = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            if (this.loaded) {
                return;
            }
            if (entry.intersectionRatio > 0) {
                this.img.nativeElement.onload = () => {
                    this.img.nativeElement.className += 'loaded';
                    this.loaded = true;
                    io.unobserve(this.parent.nativeElement);
                };
                this.img.nativeElement.src = this.src;
            }
        });
        io.observe(this.parent.nativeElement);
    }

    public getUrl(): SafeStyle {
        return this._sanitizer.bypassSecurityTrustStyle(`url('${this.data}')`);
    }

}
