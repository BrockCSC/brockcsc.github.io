import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'csc-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputContainerComponent implements OnInit {
  @Input() label: string;
  @Input() colsLabel = 3;
  @Input() colsInput = 9;
  @Input() labelLocation = 'left'; // only left/top supported

  constructor() {}

  ngOnInit() {}

  public getLabelCols(): number {
    // We want to set column width to 100% so that label will be placed on top.
    return this.labelLocation === 'left' ? this.colsLabel : 12;
  }

  public getInputCols(): number {
    return this.labelLocation === 'left' ? this.colsInput : 12;
  }
}
