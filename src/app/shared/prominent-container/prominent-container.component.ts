import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'csc-prominent-container',
  templateUrl: './prominent-container.component.html',
  styleUrls: ['./prominent-container.component.scss'],
})
export class ProminentContainerComponent implements OnInit {
  @Input() title = 'Untitled';
  constructor() {}

  ngOnInit() {}
}
