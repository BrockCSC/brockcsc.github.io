import { Routes, RouterModule } from '@angular/router';
import { EventsHomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
    { path: '', component: EventsHomeComponent },
    { path: ':id', component: EventComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forChild(routes);
