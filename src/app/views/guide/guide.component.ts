import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { ButtonDirective } from '../../shared/button/button.directive';

@Component({
  selector: 'csc-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  standalone: true,
  imports: [ButtonDirective, MarkdownComponent],
})
export class GuideComponent {}
