import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { ViewsModule } from 'app/views/views.module';
import { environment } from 'environments/environment';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app.component';
import { routing } from './app.router';

@NgModule({
  declarations: [AppComponent],
  imports: [
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
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    LazyLoadImageModule,
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
