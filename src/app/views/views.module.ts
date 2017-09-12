import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { SharedModule } from 'app/shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [HomeComponent, TeamComponent, ContactComponent, ServicesComponent, SignupComponent],
})
export class ViewsModule { }
