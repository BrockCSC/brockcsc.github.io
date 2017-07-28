import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/views';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
