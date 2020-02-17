import { ExecsComponent } from './execs/execs.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from 'app/admin/home/home.component';
import { FoodItemsComponent } from 'app/admin/food/foodItems.component';
import { AdminEventComponent } from './events/admin-event/admin-event.component';


const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            { path: '', pathMatch: 'full', redirectTo: 'home' },
            { path: 'home', component: HomeComponent },
            { path: 'execs', component: ExecsComponent },
            { path: 'events', component: EventsComponent },
            { path: 'events/:id', component: AdminEventComponent },
            { path: 'food', component: FoodItemsComponent },
            { path: '**', redirectTo: 'home' }
        ]
    }
];

export const routing = RouterModule.forChild(routes);

