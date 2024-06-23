import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideStorage } from '@angular/fire/storage';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideCscAuth } from 'app/core/auth';
import { AngularFireAuthService } from 'app/core/auth/angular-fire-auth.service';
import { provideDSCApiService } from 'app/shared/api/dsc';
import { AngularFireDSCApiService } from 'app/shared/api/dsc/angular-fire-dsc.service';
import { provideEventApiService } from 'app/shared/api/event';
import { AngularFireEventApiService } from 'app/shared/api/event/angular-fire-event.service';
import { provideExecApiService } from 'app/shared/api/exec';
import { AngularFireExecApiService } from 'app/shared/api/exec/angular-fire-exec.service';
import { provideFilesApiService } from 'app/shared/api/files';
import { AngularFireFilesApiService } from 'app/shared/api/files/angular-fire-files-api.service';
import { provideFoodApiService } from 'app/shared/api/food';
import { AngularFireFoodApiService } from 'app/shared/api/food/angular-fire-food.service';
import { provideFormApiService } from 'app/shared/api/form';
import { AngularFireFormApiService } from 'app/shared/api/form/angular-fire-form-api.service';
import { provideStorageService } from 'app/shared/api/storage';
import { AngularFireStorageService } from 'app/shared/api/storage/angular-fire-storage.service';
import { getStorage } from 'firebase/storage';
import { provideMarkdown } from 'ngx-markdown';
import { AppComponent } from './app/app.component';
import { routes as appRoutes } from './app/app.router';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideMarkdown({ loader: HttpClient }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideCscAuth(AngularFireAuthService),
    provideDSCApiService(AngularFireDSCApiService),
    provideEventApiService(AngularFireEventApiService),
    provideExecApiService(AngularFireExecApiService),
    provideFoodApiService(AngularFireFoodApiService),
    provideStorageService(AngularFireStorageService),
    provideFormApiService(AngularFireFormApiService),
    provideFilesApiService(AngularFireFilesApiService),
  ],
});
