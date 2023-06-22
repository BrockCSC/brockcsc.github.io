import { Component } from '@angular/core';

@Component({
  selector: 'csc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
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
