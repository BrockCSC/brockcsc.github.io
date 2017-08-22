import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { RouterCache } from './cache.router';
import { routing } from './app.router';
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { ViewsModule } from 'app/views/views.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'environments/environment';
import { AdminModule } from 'app/admin/admin.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        routing,
        CoreModule,
        SharedModule,
        ViewsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AdminModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: RouterCache }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
