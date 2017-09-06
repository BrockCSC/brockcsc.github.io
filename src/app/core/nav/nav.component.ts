import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

const WHITE = 'white';
const MAROON = '#AA3B3B';

@Component({
    selector: 'csc-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
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
        {
            href: '/services',
            desc: 'Services',
        },
        {
            href: '/contact',
            desc: 'Contact',
        },
        // {
        //     href: '/admin',
        //     desc: 'TempAdmin'
        // }
    ];

    private colour = WHITE;

    constructor(private _location: Location, private _router: Router) { }

    ngOnInit() { }

    /*
    For paths that don't have a contrasting backdrop for the see through navbar,
    we want to give the navbar some colour. This is done with the [ngClass] directive
    which adds the navy-background class to the root div of this view.
    */
    public changeToWhiteNav(): boolean {
        // TODO: Improve this whole logic or how the layout is done
        const currentPath = this._location.path();
        const transparentPaths = ['/', '/home'];

        for (let i = 0; i < transparentPaths.length; i++) {
            if (currentPath === transparentPaths[i]) {
                this.setTransparentNav();
                return false;
            }
        }
        this.setWhiteNav();
        return true;
    }

    private setBlackLogo() {
        this.logoSrc = 'assets/logo-black.svg';
        this.menuColor = 'rgba(0, 0, 0, 0.86)';
    }

    private setWhiteLogo() {
        this.logoSrc = 'assets/logo.svg';
        this.menuColor = 'rgba(255, 255, 255, 0.86)';
    }

    private setWhiteNav() {
        this.setBlackLogo();
        this.setLinkColours(MAROON);
    }

    private setTransparentNav() {
        this.setWhiteLogo();
        this.setLinkColours(WHITE);
    }

    private setLinkColours(colour: string) {
        this.links.forEach(link => {
            link.colour = colour;
        });
    }
}

interface NavLink {
    colour?: string;
    href: string;
    desc: string;
}
