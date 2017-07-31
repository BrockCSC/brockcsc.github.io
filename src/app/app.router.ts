import { Routes, RouterModule } from '@angular/router';
import { AdminComponent, HomeComponent } from 'app/views';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'admin', component: AdminComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
