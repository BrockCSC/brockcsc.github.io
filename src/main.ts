import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatCardModule } from '@angular/material/card';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import {
  withInterceptorsFromDi,
  provideHttpClient,
  HttpClient,
} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment as environment_1 } from 'environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { ViewsModule } from 'app/views/views.module';
import { SharedModule } from 'app/shared/shared.module';
import { CoreModule } from 'app/core/core.module';
import { routing } from './app/app.router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      routing,
      CoreModule,
      SharedModule,
      ViewsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFireStorageModule,
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      MarkdownModule.forRoot({ loader: HttpClient }),
      MatCardModule
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
});
