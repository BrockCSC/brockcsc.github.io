import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CscEvent, CscFile, EventApiService } from 'app/shared/api';
import { ImageConfig, ImageStyleConfig } from 'app/shared/imageConfig';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeImageConfigs } from './imageConfigs';

@Component({
  selector: 'csc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  events: Row[] = [];
  services: Row[] = [];
  nextEvent: CscEvent;
  images: HomeImages = {
    about: HomeImageConfigs.about,
    partyPopper: Object.assign(HomeImageConfigs.partyPopper, {
      width: 16,
      height: 16,
    }), // overwrites the generated w/h
    hero: Object.assign(HomeImageConfigs.hero),
  };
  homeSlideshowSrcs$: Observable<string[]>;
  heroStyleConfig: ImageStyleConfig;

  constructor(
    private _eventApi: EventApiService,
    private _db: AngularFireDatabase
  ) {
    this.homeSlideshowSrcs$ = _db
      .list<CscFile>('files/homeSlideshow')
      .valueChanges()
      .pipe(
        map((files) => {
          // First one is always the static hero image, initial temp lazy load background is set for it.
          return [this.images.hero.src, ...files.map((file) => file.url)];
        })
      );
  }

  ngOnInit() {
    this.initEvents();
    this.initServices();
    this._eventApi.getNextEvent().subscribe((event) => {
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
        desc:
          "From board games to first-person shooters. We're always up for a good game night.",
      },
      {
        icon: 'code',
        title: 'Tech talks & Seminars',
        desc:
          'We give a variety of talks throughout the year on all things software development.',
      },
      {
        icon: 'people',
        title: 'Social',
        desc:
          'Get to know fellow members and the computer science department at our social events.',
      },
      {
        icon: 'add',
        title: 'More',
        desc: '... and much more!',
      },
    ];
  }

  public initServices(): void {
    this.services = [
      {
        icon: 'local_pizza',
        title: 'Food',
        desc: 'Feeling hungry? We sell food at low prices from MCJ 330.',
      },
      {
        icon: 'chat_bubble',
        title: 'Chatrooms',
        desc:
          'We have dedicated channels where you can chat with other members about your classes, programming questions or anything else!',
      },
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
  about: ImageConfig;
  partyPopper: ImageConfig;
  hero: ImageConfig;
}
