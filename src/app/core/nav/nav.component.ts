import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'csc-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(private _location: Location, private _router: Router) {

    }

    ngOnInit() {
    }

    /*
    For paths that don't have a contrasting backdrop for the see through navbar,
    we want to give the navbar some colour. This is done with the [ngClass] directive
    which adds the navy-background class to the root div of this view.
    */
    public changeBackground(): boolean {
        // TODO: Improve this whole logic or how the layout is done
        const currentPath = this._location.path();
        const noBgPaths = ['admin'];

        for (let i = 0; i < noBgPaths.length; i++) {
            if (currentPath.indexOf(noBgPaths[i]) !== -1) {
                return true;
            }
        }
        return false;
    }

}
