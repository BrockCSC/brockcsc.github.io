import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'csc-progress-bar',
  standalone: true,
  imports: [NgClass],
  styleUrls: ['./progress-bar.component.scss'],
  template: `
    <div class="csc-progress-container" [ngClass]="color">
      <div class="csc-progress-bar" [style.width.%]="progress"></div>
      <span>{{ floorProgress() }} %</span>
    </div>
  `,
})
export class ProgressBarComponent {
  @Input() progress: number;
  @Input() color: string;

  constructor() {
    this.progress = 0;
    this.color = 'navy';
  }

  public floorProgress(): number {
    return Math.floor(this.progress);
  }
}
