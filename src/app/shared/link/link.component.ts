import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li[csclink], a[csclink]',
  template: `
    <div class="csc-link">
      <ng-content></ng-content>
      <span class="csc-link-line"></span>
    </div>
  `,
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class LinkComponent {}
