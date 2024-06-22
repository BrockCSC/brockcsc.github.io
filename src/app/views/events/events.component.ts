import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'csc-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class EventsComponent {}
