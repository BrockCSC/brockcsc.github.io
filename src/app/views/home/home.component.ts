import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'csc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    events: Event[] = [];

    constructor() { }

    ngOnInit() {
        this.initEvents();
    }

    initEvents(): void {
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
                icon: 'people_outline',
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

}

interface Event {
    icon: string;
    title: string;
    desc: string;
}
