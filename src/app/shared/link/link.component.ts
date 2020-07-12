import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li[csclink], a[csclink]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
