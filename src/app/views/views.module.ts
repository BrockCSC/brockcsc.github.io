import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'app/shared/shared.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [HomeComponent],
    declarations: [HomeComponent, AdminComponent]
})
export class ViewsModule { }
