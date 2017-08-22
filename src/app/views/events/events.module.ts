import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { EventsComponent } from './events.component';
import { EventsHomeComponent } from './home/home.component';
import { routing } from './events.router';
import { EventComponent } from './event/event.component';
import { EventDataService } from './event-data.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing
    ],
    exports: [

    ],
    declarations: [
        EventsComponent,
        EventsHomeComponent,
        EventComponent
    ],
    providers: [
        EventDataService
    ]
})
export class EventsModule { }
