import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'csc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    events: Row[] = [];
    services: Row[] = [];
    socialIcons: SocialIcon[] = [];

    constructor() { }

    ngOnInit() {
        this.initEvents();
        this.initServices();
        this.initSocialIcons();
    }

    public initSocialIcons(): void {
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
                src: `${base}/slack.svg`,
                href: 'https://brockcsc.slack.com',
                desc: 'Slack'
            },
        ];
    }

    public initEvents(): void {
        this.events = [
            {
                icon: 'videogame_asset',
                title: 'Gaming',
                desc: 'Something here about games we play'
            },
            {
                icon: 'code',
                title: 'Techtalks & Seminars',
                desc: 'We give a variety of talks throughout the year on all things software development'
            },
            {
                icon: 'people',
                title: 'Social',
                desc: 'Get to know fellow members and the department at our social events'
            },
            {
                icon: 'add',
                title: 'More',
                desc: '... and much more!'
            }

        ];
    }

    public initServices(): void {
        this.services = [
            {
                icon: 'local_pizza',
                title: 'Food',
                desc: 'Feeling hungry? We sell food at low prices'
            },
            {
                icon: 'chat_bubble',
                title: 'Chatrooms',
                desc: 'We have dedicated channels where you can chat with other members about your classes,' +
                'programming questions or anything else'
            }
        ];
    }

}

interface Row {
    icon: string;
    title: string;
    desc: string;
}

interface SocialIcon {
    src: string;
    href: string;
    desc: string;
}
