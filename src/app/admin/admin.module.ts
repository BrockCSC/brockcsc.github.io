import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { routing } from './admin.router';
import { AddModalComponent as AddDSCModal } from './dsc/add-modal/add-modal.component';
import { DSCComponent } from './dsc/dsc.component';
import { EditModalComponent as EditDSCModal } from './dsc/edit-modal/edit-modal.component';
import { RemoveModalComponent as RemoveDSCModal } from './dsc/remove-modal/remove-modal.component';
import { AddModalComponent as AddEventModal } from './events/add-modal/add-modal.component';
import { AdminEventComponent } from './events/admin-event/admin-event.component';
import { EditModalComponent as EditEventModal } from './events/edit-modal/edit-modal.component';
import { EventsComponent } from './events/events.component';
import { RemoveModalComponent as RemoveEventModal } from './events/remove-modal/remove-modal.component';
import { AddModalComponent as AddExecModal } from './execs/add-modal/add-modal.component';
import { EditModalComponent as EditExecModal } from './execs/edit-modal/edit-modal.component';
import { ExecsComponent } from './execs/execs.component';
import { RemoveModalComponent as RemoveExecModal } from './execs/remove-modal/remove-modal.component';
import { FilesComponent } from './files/files.component';
import { AddModalComponent as AddFoodModal } from './food/add-modal/add-modal.component';
import { EditModalComponent as EditFoodModal } from './food/edit-modal/edit-modal.component';
import { FoodItemsComponent } from './food/foodItems.component';
import { RemoveModalComponent as RemoveFoodModal } from './food/remove-modal/remove-modal.component';
import { FormResponsesComponent } from './form-responses/form-responses.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    // CommonModule,
    // SharedModule,
    // FormsModule,
    // ReactiveFormsModule,
    routing,
    // MatIconModule,
    // MatButtonModule,
    // MatTooltipModule,
    // ClipboardModule,
    AdminComponent,
    ExecsComponent,
    EventsComponent,
    FoodItemsComponent,
    HomeComponent,
    AddEventModal,
    RemoveEventModal,
    EditEventModal,
    AddExecModal,
    RemoveExecModal,
    EditExecModal,
    AddFoodModal,
    RemoveFoodModal,
    EditFoodModal,
    AdminEventComponent,
    FormResponsesComponent,
    FilesComponent,
    DSCComponent,
    AddDSCModal,
    EditDSCModal,
    RemoveDSCModal,
  ],
})
export class AdminModule {}
