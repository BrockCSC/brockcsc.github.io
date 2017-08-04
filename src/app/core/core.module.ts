import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'app/shared/shared.module';
import { routing } from 'app/app.router';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing
    ],
    exports: [
        NavComponent,
        FooterComponent
    ],
    declarations: [NavComponent, FooterComponent]
})
export class CoreModule { }
