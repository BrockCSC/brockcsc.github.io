import { Component, Input } from '@angular/core';

@Component({
  selector: 'csc-prominent-container',
  standalone: true,
  styleUrls: ['./prominent-container.component.scss'],
  template: `
    <fieldset
      style="border: 1px #aa3b3b solid; border-radius: 10px; margin-top: 5px;"
    >
      <legend class="label">
        {{ title }}
      </legend>
      <ng-content></ng-content>
    </fieldset>
  `,
})
export class ProminentContainerComponent {
  @Input() title = 'Untitled';
}
