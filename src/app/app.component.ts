import { Component } from '@angular/core';
import { ScrollService } from './shared/services/scroll.service';

@Component({
  selector: 'csc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'csc';
  constructor(private scrollService: ScrollService) {}
}
