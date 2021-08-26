import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/auth/auth.guard';
import {
  ContactComponent,
  DSCComponent,
  HomeComponent,
  ServicesComponent,
  SignupComponent,
  TeamComponent,
  ExecApplicationsComponent,
} from 'app/views';
import { GalleryComponent } from './views/gallery/gallery.component';
import { GuideComponent } from './views/guide/guide.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'admin',
    loadChildren: () =>
      import('app/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('app/views/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'home', component: HomeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dsc', component: DSCComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'join', component: SignupComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'gallery', component: GalleryComponent },
  {
    path: 'events',
    loadChildren: () =>
      import('app/views/events/events.module').then((m) => m.EventsModule),
  },
  { path: 'exec-application', component: ExecApplicationsComponent },
  { path: '**', redirectTo: 'home' },
];

export const routing = RouterModule.forRoot(routes);
