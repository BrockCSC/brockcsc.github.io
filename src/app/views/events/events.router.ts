import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events.component';
import { EventsHomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: '', component: EventsHomeComponent },
      { path: ':id', component: EventComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];
export const routing = RouterModule.forChild(routes);
