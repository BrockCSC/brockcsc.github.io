import { NgModule } from '@angular/core';
import { ContactComponent } from './contact/contact.component';
import { DSCComponent } from './dsc/dsc.component';
import { ExecApplicationsComponent } from './exec-applications/execapplications.component';
import { GuideComponent } from './guide/guide.component';
import { HomeComponent } from './home/home.component';
import { MerchComponent } from './merch/merch.component';
import { ServicesComponent } from './services/services.component';
import { SignupComponent } from './signup/signup.component';
import { TeamExecInfoComponent } from './team/team-exec-info/team-exec-info.component';
import { TeamPreviewComponent } from './team/team-preview/team-preview.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  imports: [
    // CommonModule,
    // SharedModule,
    // RouterModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MarkdownModule,
    // MatTooltipModule,
    // NgxGalleryModule,
    // MatCardModule,
    // MatButtonModule,
    // MatIconModule,
    HomeComponent,
    TeamComponent,
    ContactComponent,
    ServicesComponent,
    DSCComponent,
    SignupComponent,
    GuideComponent,
    TeamPreviewComponent,
    // GalleryComponent,
    ExecApplicationsComponent,
    TeamExecInfoComponent,
    MerchComponent,
  ],
})
export class ViewsModule {}
