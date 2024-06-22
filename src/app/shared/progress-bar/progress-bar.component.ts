import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'csc-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  standalone: true,
  imports: [NgClass],
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
