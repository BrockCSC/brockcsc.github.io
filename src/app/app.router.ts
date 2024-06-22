import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/auth/auth.guard';
import {
  ContactComponent,
  DSCComponent,
  HomeComponent,
  ServicesComponent,
  SignupComponent,
  TeamComponent,
} from 'app/views';
import { routes as adminRoutes } from './admin/admin.router';
import { routes as authRoutes } from './views/auth/auth.router';
import { routes as eventRoutes } from './views/events/events.router';
import { GuideComponent } from './views/guide/guide.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'admin',
    children: adminRoutes,
    // loadChildren: () =>
    //   import('app/admin/admin.module').then((m) => m.AdminModule),
    canActivate: mapToCanActivate([AuthGuard]),
  },
  {
    path: 'auth',
    children: authRoutes,
    // loadChildren: () =>
    //   import('app/views/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'home', component: HomeComponent },
  // { path: 'merch', component: MerchComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dsc', component: DSCComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'join', component: SignupComponent },
  { path: 'services', component: ServicesComponent },
  // { path: 'gallery', component: GalleryComponent },
  {
    path: 'events',
    children: eventRoutes,
    // loadChildren: () =>
    //   import('app/views/events/events.module').then((m) => m.EventsModule),
  },
  // { path: 'exec-application', component: ExecApplicationsComponent },
  { path: '**', redirectTo: 'home' },
];

export const routing = RouterModule.forRoot(routes);
