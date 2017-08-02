import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { routing } from './admin.router';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    declarations: [AdminComponent, EventsComponent, HomeComponent]
})
export class AdminModule { }
