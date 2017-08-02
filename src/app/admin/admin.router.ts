import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from 'app/admin/home/home.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'events', component: EventsComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forChild(routes);

