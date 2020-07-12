import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'button[csc-button], a[csc-button]',
})
export class ButtonDirective {
  @HostBinding('class.csc-button') btnClass = true;
}
