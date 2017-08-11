import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { routing } from './admin.router';
import { EventsComponent } from './events/events.component';
import { ExecsComponent } from './execs/execs.component';
import { HomeComponent } from './home/home.component';
import { AddModalComponent as AddEventModal } from './events/add-modal/add-modal.component';
import { RemoveModalComponent as RemoveEventModal } from './events/remove-modal/remove-modal.component';
import { EditModalComponent as EditEventModal } from './events/edit-modal/edit-modal.component';
import { AddModalComponent as AddExecModal } from './execs/add-modal/add-modal.component';
import { RemoveModalComponent as RemoveExecModal } from './execs/remove-modal/remove-modal.component';
import { EditModalComponent as EditExecModal } from './execs/edit-modal/edit-modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    declarations: [AdminComponent, ExecsComponent, EventsComponent, HomeComponent, AddEventModal, RemoveEventModal, EditEventModal, AddExecModal, RemoveExecModal, EditExecModal]
})
export class AdminModule { }
