import { RouterModule, Routes } from '@angular/router';
import { FoodItemsComponent } from 'app/admin/food/foodItems.component';
import { HomeComponent } from 'app/admin/home/home.component';
import { AdminComponent } from './admin.component';
import { DSCComponent } from './dsc/dsc.component';
import { AdminEventComponent } from './events/admin-event/admin-event.component';
import { EventsComponent } from './events/events.component';
import { ExecsComponent } from './execs/execs.component';
import { FilesComponent } from './files/files.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'execs', component: ExecsComponent },
      { path: 'events', component: EventsComponent },
      { path: 'events/:id', component: AdminEventComponent },
      { path: 'files', component: FilesComponent },
      { path: 'food', component: FoodItemsComponent },
      { path: 'dsc', component: DSCComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
