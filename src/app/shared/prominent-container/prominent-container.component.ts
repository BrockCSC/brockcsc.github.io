import { Component, Input } from '@angular/core';

@Component({
  selector: 'csc-prominent-container',
  templateUrl: './prominent-container.component.html',
  styleUrls: ['./prominent-container.component.scss'],
})
export class ProminentContainerComponent {
  @Input() title = 'Untitled';
}
