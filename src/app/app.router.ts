import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, TeamComponent, ServicesComponent, ContactComponent, SignupComponent } from 'app/views';
import { AuthGuard } from 'app/core/auth/auth.guard';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'admin', loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
    { path: 'auth', loadChildren: () => import('app/views/auth/auth.module').then(m => m.AuthModule) },
    { path: 'home', component: HomeComponent },
    { path: 'team', component: TeamComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'events',  loadChildren: () => import('app/views/events/events.module').then(m => m.EventsModule)},
    { path: '**', redirectTo: 'home' }
    // { path: 'path', loadChildren: 'lazy-path#lazy-module' },
];

export const routing = RouterModule.forRoot(routes);
