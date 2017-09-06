import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, TeamComponent, EventsComponent, ContactComponent } from 'app/views';
import { AdminComponent } from 'app/admin/admin.component';
import { AuthGuard } from 'app/core/auth/auth.guard';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'admin', component: AdminComponent, loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [AuthGuard] },
    { path: 'auth', loadChildren: 'app/views/auth/auth.module#AuthModule' },
    { path: 'home', component: HomeComponent },
    { path: 'team', component: TeamComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'events', component: EventsComponent, loadChildren: 'app/views/events/events.module#EventsModule'},
    { path: '**', redirectTo: 'home' }
    // { path: 'path', loadChildren: 'lazy-path#lazy-module' },
];

export const routing = RouterModule.forRoot(routes);
