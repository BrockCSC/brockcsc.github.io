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
  standalone: true,
})
export class LinkComponent {
  constructor() {}
}
