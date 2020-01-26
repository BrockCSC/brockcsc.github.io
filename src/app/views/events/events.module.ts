import { ReactiveFormsModule } from '@angular/forms';
import { EventFormComponent } from './event-form/event-form.component';
import { RouterModule } from '@angular/router';
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
        routing,
        RouterModule,
        ReactiveFormsModule,
    ],
    exports: [
    ],
    declarations: [
        EventsComponent,
        EventsHomeComponent,
        EventComponent,
        EventFormComponent,
    ],
    providers: [
        EventDataService
    ]
})
export class EventsModule { }
