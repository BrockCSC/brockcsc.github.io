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

    @ViewChild('logo') logo: ElementRef;
    links: NavLink[];
    colour = WHITE;

    constructor(private _location: Location, private _router: Router) { }

    ngOnInit() {
        this.initLinks();
    }

    initLinks(): void {
        this.links = [
            {
                href: '/team',
                desc: 'Team',
            },
            {
                href: '/events',
                desc: 'Events',
            },
            {
                href: '',
                desc: 'Services',
            },
            {
                href: '',
                desc: 'Contact',
            },
            {
                href: '/admin',
                desc: 'TempAdmin'
            }
        ];
    }

    /*
    For paths that don't have a contrasting backdrop for the see through navbar,
    we want to give the navbar some colour. This is done with the [ngClass] directive
    which adds the navy-background class to the root div of this view.
    */
    public changeToWhiteNav(): boolean {
        // TODO: Improve this whole logic or how the layout is done
        const currentPath = this._location.path();
        const noBgPaths = ['admin', 'team', 'events'];

        for (let i = 0; i < noBgPaths.length; i++) {
            if (currentPath.indexOf(noBgPaths[i]) !== -1) {
                this.setWhiteNav();
                return true;
            }
        }

        this.setTransparentNav();
        return false;
    }

    private setBlackLogo() {
        this.logo.nativeElement.src = 'assets/logo-black.svg';
    }

    private setWhiteLogo() {
        this.logo.nativeElement.src = 'assets/logo.svg';
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
