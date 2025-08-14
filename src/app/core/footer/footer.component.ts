import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DISCORD_LINK } from './../../shared/utils/constants';
import { ImgComponent } from '../../shared/img/img.component';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'csc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, ImgComponent],
})
export class FooterComponent implements OnInit, OnDestroy {
  public imageSize = 35;
  public socialIcons: SocialIcon[] = [];
  public showSocialLinks = true;
  private routerSubscription: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.initSocialIcons();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showSocialLinks = event.url !== '/links';
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  initSocialIcons(): void {
    const base = '/assets/icons';
    this.socialIcons = [
      {
        src: `${base}/instagram.svg`,
        href: 'https://instagram.com/brockcsc',
        desc: 'Instagram',
      },
      {
        src: `${base}/busu.jpeg`,
        href: 'https://www.brockbusu.ca/organisation/8492/',
        desc: 'BUSU',
      },
      {
        src: `${base}/discord.svg`,
        href: DISCORD_LINK,
        desc: 'Discord',
      },
      {
        src: `${base}/github.svg`,
        href: 'https://github.com/brockcsc/brockcsc.github.io',
        desc: 'GitHub',
      },
    ];
  }
}

interface SocialIcon {
  src: string;
  href: string;
  desc: string;
}
