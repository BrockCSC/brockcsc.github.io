import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'csc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public links: Link[] = [
    { name: 'Home', routerLink: 'home' },
    { name: 'Execs', routerLink: 'execs' },
    { name: 'Events', routerLink: 'events' },
    { name: 'Food', routerLink: 'food' },
    { name: 'Files', routerLink: 'files' },
  ];

  constructor() {}

  ngOnInit() {}
}

interface Link {
  name: string;
  routerLink: string;
}
