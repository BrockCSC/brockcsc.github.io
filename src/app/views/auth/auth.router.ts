import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'app/views/auth/login/login.component';
import { LogoutComponent } from 'app/views/auth/logout/logout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forChild(routes);
