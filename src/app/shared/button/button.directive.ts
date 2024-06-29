import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'button[csc-button], a[csc-button]',
  standalone: true,
})
export class ButtonDirective {
  @HostBinding('class.csc-button') btnClass = true;
}
