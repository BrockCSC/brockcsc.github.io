import { EventFormComponent } from './event-form/event-form.component';
import { Routes, RouterModule } from '@angular/router';
import { EventsHomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events.component';

const routes: Routes = [
    {
        path: '', component: EventsComponent, children: [
            { path: '', component: EventsHomeComponent },
            { path: ':id', component: EventComponent },
            { path: '**', redirectTo: '' },
        ]
    }
];
export const routing = RouterModule.forChild(routes);
