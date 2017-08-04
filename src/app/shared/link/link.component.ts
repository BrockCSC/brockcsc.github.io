import {
        Component,
        ViewEncapsulation,
        ViewChild,
        ElementRef,
        Input,
        AfterViewChecked,
        HostListener
    } from "@angular/core";

@Component({
    selector: "li[csclink], a[csclink]",
    templateUrl: "./link.component.html",
    styleUrls: ["./link.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class LinkComponent implements AfterViewChecked {

    @Input() csclink: string;
    @ViewChild('line') line: ElementRef;

    constructor() {}

    ngAfterViewChecked() {
        this.line.nativeElement.style.background = this.csclink;
    }

    @HostListener('mouseover', [])
    onHover() {
        this.line.nativeElement.style.width = '100%';
    }

    @HostListener('mouseout', [])
    onMouseOut() {
        this.line.nativeElement.style.width = '0%';
    }
}
