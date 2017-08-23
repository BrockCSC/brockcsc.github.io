import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, TeamComponent, EventsComponent } from 'app/views';
import { AdminComponent } from 'app/admin/admin.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'admin', component: AdminComponent, loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'home', component: HomeComponent },
    { path: 'team', component: TeamComponent },
    { path: 'events', component: EventsComponent, loadChildren: 'app/views/events/events.module#EventsModule'},
    { path: '**', redirectTo: '' }
    // { path: 'path', loadChildren: 'lazy-path#lazy-module' },
];

export const routing = RouterModule.forRoot(routes);
