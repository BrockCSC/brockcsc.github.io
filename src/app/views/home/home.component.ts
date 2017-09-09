import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Event, EventApiService } from 'app/shared/api';
import { FirebaseListObservable } from 'angularfire2/database';
import { ImageConfig } from "app/shared/imageConfig";

@Component({
    selector: 'csc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

    events: Row[] = [];
    services: Row[] = [];
    nextEvent: Event;


    constructor(private _eventApi: EventApiService) { }

    ngOnInit() {
        this.initEvents();
        this.initServices();
        this._eventApi.getNextEvent().subscribe(event => {
            this.nextEvent = event;
        });
    }

    async ngAfterViewInit() {
        await this.loadScript('//platform.twitter.com/widgets.js');
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
                title: 'Tech talks & Seminars',
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
                desc: 'We have dedicated channels where you can chat with other members about your classes, ' +
                'programming questions or anything else!'
            }
        ];
    }

    private loadScript(scriptUrl: string) {
        return new Promise((resolve, reject) => {
            const scriptTag = document.createElement('script');
            scriptTag.src = scriptUrl;
            scriptTag.onload = resolve;
            document.body.appendChild(scriptTag);
        });
    }

}

interface Row {
    icon: string;
    title: string;
    desc: string;
}

interface HomeImages {
    // hero: ImageConfig;
    about: ImageConfig;
}
