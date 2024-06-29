import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'csc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLinkActive, RouterLink, RouterOutlet],
})
export class AdminComponent {
  public links: Link[] = [
    { name: 'Home', routerLink: 'home' },
    { name: 'Execs', routerLink: 'execs' },
    { name: 'Events', routerLink: 'events' },
    { name: 'Food', routerLink: 'food' },
    { name: 'DSC', routerLink: 'dsc' },
    { name: 'Files', routerLink: 'files' },
  ];
}

interface Link {
  name: string;
  routerLink: string;
}
