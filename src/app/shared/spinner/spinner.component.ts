import { Component } from '@angular/core';

@Component({
  selector: 'csc-spinner',
  standalone: true,
  styleUrls: ['./spinner.component.scss'],
  template: `
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  `,
})
export class SpinnerComponent {}
