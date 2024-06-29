import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[csc-button]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class ButtonComponent {}
