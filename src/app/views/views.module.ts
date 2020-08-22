import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { MarkdownModule } from 'ngx-markdown';
import { ContactComponent } from './contact/contact.component';
import { DSCComponent } from './dsc/dsc.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GuideComponent } from './guide/guide.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { SignupComponent } from './signup/signup.component';
import { TeamPreviewComponent } from './team/team-preview/team-preview.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule,
    MatTooltipModule,
    NgxGalleryModule,
  ],
  declarations: [
    HomeComponent,
    TeamComponent,
    ContactComponent,
    ServicesComponent,
    DSCComponent,
    SignupComponent,
    GuideComponent,
    TeamPreviewComponent,
    GalleryComponent,
  ],
})
export class ViewsModule {}
