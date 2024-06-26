import { Component, OnInit } from '@angular/core';
import { DISCORD_LINK } from './../../shared/utils/constants';
import { ImgComponent } from '../../shared/img/img.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'csc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [NgFor, ImgComponent],
})
export class FooterComponent implements OnInit {
  public imageSize = 35;
  public socialIcons: SocialIcon[] = [];

  constructor() {}

  ngOnInit() {
    this.initSocialIcons();
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
        src: `${base}/twitter.svg`,
        href: 'https://twitter.com/brockucsc',
        desc: 'Twitter',
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
      {
        src: `${base}/facebook.svg`,
        href: 'https://www.facebook.com/BrockCSC/',
        desc: 'Facebook',
      },
    ];
  }
}

interface SocialIcon {
  src: string;
  href: string;
  desc: string;
}
