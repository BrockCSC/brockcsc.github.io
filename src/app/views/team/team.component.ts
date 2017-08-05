import { Component } from '@angular/core';

@Component({
    selector: 'csc-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent {

    // TODO: This could get messy, should consider a better way to do this.
    execs: Executive[] = [
        {
            id: 'igor',
            name: 'Igor Laskaev',
            title: 'President',
            desc: 'The iggs is here',
            avatarSrc: 'http://via.placeholder.com/76x76',
        },
        {
            id: 'fahad',
            name: 'Fahad Ahmad',
            title: 'Executive',
            desc: 'gnu af',
            avatarSrc: 'http://via.placeholder.com/76x76',
        },
        {
            id: 'sammi',
            name: 'Sammi Yin Mak',
            title: 'Executive',
            desc: 'update',
            avatarSrc: 'http://via.placeholder.com/76x76',
        },
        {
            id: 'patrick',
            name: 'Patrick Deshwal',
            title: 'Executive',
            desc: 'update',
            avatarSrc: 'http://via.placeholder.com/76x76',
        },
        {
            id: 'lindsey',
            name: 'Lindsey Tulloch',
            title: 'Executive',
            desc: 'update',
            avatarSrc: 'http://via.placeholder.com/76x76',
        },
        {
            id: 'jesse',
            name: 'Jesse Belleau-Karaskewich',
            title: 'Executive',
            desc: 'update',
            avatarSrc: 'http://via.placeholder.com/76x76',
        },
        {
            id: 'abdul',
            name: 'Abdul El Badaoui',
            title: 'Executive',
            desc: 'update',
            avatarSrc: 'http://via.placeholder.com/76x76'
        },
        {
            id: 'dana',
            name: 'Dana Darmohray',
            title: 'Executive',
            desc: 'update',
            avatarSrc: 'http://via.placeholder.com/76x76'
        }

    ];

    constructor() { }
}

interface Executive {
    // Id's are neccessary for tooltip
    id: string;
    name: string;
    title: string;
    desc: string;
    avatarSrc: string;
}

