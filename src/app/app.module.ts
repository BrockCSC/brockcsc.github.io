import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app.router';
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { ViewsModule } from 'app/views/views.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        routing,
        CoreModule,
        SharedModule,
        ViewsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
