import { DISCORD_LINK } from './../../shared/utils/constants';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'csc-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
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
                src: `${base}/facebook.svg`,
                href: 'https://www.facebook.com/BrockCSC/',
                desc: 'Facebook'
            },
            {
                src: `${base}/twitter.svg`,
                href: 'https://twitter.com/brockucsc',
                desc: 'Twitter'
            },
            {
                src: `${base}/instagram.svg`,
                href: 'https://instagram.com/brockcsc',
                desc: 'Instagram'
            },
            {
                src: `${base}/discord.svg`,
                href: DISCORD_LINK,
                desc: 'Discord'
            }
        ];
    }
}

interface SocialIcon {
    src: string;
    href: string;
    desc: string;
}
