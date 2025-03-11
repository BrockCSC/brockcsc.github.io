import { Component, OnInit } from '@angular/core';
import { ScrollService } from './shared/services/scroll.service';
import { FooterComponent } from './core/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/nav/nav.component';
import { MetaService } from './shared/services/meta.service';

@Component({
  selector: 'csc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavComponent, RouterOutlet, FooterComponent],
})
export class AppComponent implements OnInit {
  title = 'csc';

  constructor(
    private scrollService: ScrollService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    // Initialize the meta service to handle route changes
    this.metaService.init();
  }
}
