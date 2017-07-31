import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'app/shared/shared.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [HomeComponent],
    declarations: [HomeComponent, AdminComponent]
})
export class ViewsModule { }
