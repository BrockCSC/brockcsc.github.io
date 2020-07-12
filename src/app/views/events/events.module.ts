import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { EventDataService } from './event-data.service';
import { EventFormComponent } from './event-form/event-form.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events.component';
import { routing } from './events.router';
import { EventsHomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [],
  declarations: [
    EventsComponent,
    EventsHomeComponent,
    EventComponent,
    EventFormComponent,
  ],
  providers: [EventDataService],
})
export class EventsModule {}
