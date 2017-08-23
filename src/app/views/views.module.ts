import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { SharedModule } from 'app/shared/shared.module';
import { EventsModule } from './events/events.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        EventsModule
    ],
    exports: [HomeComponent],
    declarations: [HomeComponent, TeamComponent]
})
export class ViewsModule { }
