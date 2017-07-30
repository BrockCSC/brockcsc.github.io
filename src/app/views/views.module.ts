import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [HomeComponent],
    declarations: [HomeComponent]
})
export class ViewsModule { }
