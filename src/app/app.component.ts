import { Component } from '@angular/core';
import { ScrollService } from './shared/services/scroll.service';
import { FooterComponent } from './core/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/nav/nav.component';

@Component({
  selector: 'csc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavComponent, RouterOutlet, FooterComponent],
})
export class AppComponent {
  title = 'csc';
  constructor(private scrollService: ScrollService) {}
}
