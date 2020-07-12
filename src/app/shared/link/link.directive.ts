import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'li[csc-link], a[csc-link]',
})
export class LinkDirective {
  @HostBinding('class.csc-link') linkClass = true;
}
