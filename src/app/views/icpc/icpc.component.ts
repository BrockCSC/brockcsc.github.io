import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { ButtonDirective } from '../../shared/button/button.directive';

@Component({
  selector: 'csc-guide',
  templateUrl: './icpc.component.html',
  styleUrls: ['./icpc.component.scss'],
  standalone: true,
  imports: [ButtonDirective, MarkdownComponent],
})
export class ICPCComponent {}
