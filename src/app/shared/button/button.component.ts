import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[csc-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class ButtonComponent {}
