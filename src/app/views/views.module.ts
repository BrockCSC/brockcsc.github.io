import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { ContactComponent } from './contact/contact.component';
import { GuideComponent } from './guide/guide.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { SignupComponent } from './signup/signup.component';
import { TeamPreviewComponent } from './team/team-preview/team-preview.component';
import { TeamComponent } from './team/team.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule,
    LazyLoadImageModule,
  ],
  declarations: [
    HomeComponent,
    TeamComponent,
    ContactComponent,
    ServicesComponent,
    SignupComponent,
    GuideComponent,
    TeamPreviewComponent,
  ],
})
export class ViewsModule {}
