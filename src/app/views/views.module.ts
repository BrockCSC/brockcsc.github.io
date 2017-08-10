import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { SharedModule } from 'app/shared/shared.module';
import { EventsComponent } from './events/events.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [HomeComponent],
    declarations: [HomeComponent, TeamComponent, EventsComponent]
})
export class ViewsModule { }
