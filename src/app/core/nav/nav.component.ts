import { AsyncPipe, Location, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ScrollService } from 'app/shared/services/scroll.service';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ButtonComponent } from '../../shared/button/button.component';
import { ButtonDirective } from '../../shared/button/button.directive';
import { LinkComponent } from '../../shared/link/link.component';

const WHITE = 'white';
const MAROON = '#AA3B3B';
const ANIMATION_END_Y = 30;

@Component({
  selector: 'csc-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    ButtonDirective,
    ButtonComponent,
    NgFor,
    LinkComponent,
    RouterLinkActive,
    AsyncPipe,
  ],
})
export class NavComponent implements OnInit {
  public logoSrc = 'assets/logo.svg';
  public menuColor = 'rgba(255, 255, 255, 0.86)';

  public links: NavLink[] = [
    {
      href: '/team',
      desc: 'Team',
    },
    {
      href: '/events',
      desc: 'Events',
    },
    // {
    //   href: '/merch',
    //   desc: 'Merch',
    // },
    // {
    //   href: '/services',
    //   desc: 'Services',
    // },
    {
      href: '/guide',
      desc: 'CS Guide',
    },
    // {
    //   href: '/exec-application',
    //   desc: 'Exec Application',
    // },
    // {
    //   href: '/dsc',
    //   desc: 'DSC',
    // },
    // {
    //   href: '/competition',
    //   desc: 'Competition',
    // },
    {
      href: 'https://volunteer.brockcsc.ca',
      desc: 'Volunteer',
    },
    {
      href: '/contact',
      desc: 'Contact',
    },
  ];

  public linkAdmin: NavLink = { href: '/admin', desc: 'Admin' };
  public linkLogout: NavLink = { href: '/auth/logout', desc: 'Logout' };

  public showOverlay = false;
  public white$: Observable<boolean>;
  public opacity$: Observable<number>;

  constructor(
    private _location: Location,
    private _router: Router,
    private _auth: AuthService,
    private _scroll: ScrollService
  ) {
    this.opacity$ = this._scroll.scrollY$.pipe(
      map((y) => {
        return Math.min(ANIMATION_END_Y, y) / ANIMATION_END_Y;
      })
    );
    this.white$ = combineLatest(
      this._router.events.pipe(startWith(new NavigationEnd(0, '/', '/'))),
      this.opacity$.pipe(startWith([0])),
      (_, opacity) => {
        const currentPath = this._location.path();
        const transparentPaths = ['/', '/home'];
        return (
          !transparentPaths.some((path) => path === currentPath) ||
          opacity === 1
        );
      }
    );
  }

  public ngOnInit(): void {
    this.initLinks();
  }

  public initLinks(): void {
    this._auth.getUser().subscribe((user) => {
      if (user) {
        this.linkLogout.visible = true;
        if (user.admin) {
          this.linkAdmin.visible = true;
        }
      } else {
        this.linkLogout.visible = false;
        this.linkAdmin.visible = false;
      }
    });
  }

  public toggleOverlayMenu() {
    this.showOverlay = !this.showOverlay;
  }
}

interface NavLink {
  colour?: string;
  href: string;
  desc: string;
  visible?: boolean;
}
