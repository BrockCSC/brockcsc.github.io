import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideCscAuth } from 'app/core/auth';
import { provideDSCApiService } from 'app/shared/api/dsc';
import { provideEventApiService } from 'app/shared/api/event';
import { provideExecApiService } from 'app/shared/api/exec';
import { provideFoodApiService } from 'app/shared/api/food';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app/app.component';
import { routes as appRoutes } from './app/app.router';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFireStorageModule,
      MarkdownModule.forRoot({ loader: HttpClient })
    ),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideCscAuth(),
    provideDSCApiService(),
    provideEventApiService(),
    provideExecApiService(),
    provideFoodApiService(),
  ],
});
