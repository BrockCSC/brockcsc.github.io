import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './auth.router';
import { SharedModule } from 'app/shared/shared.module';
import { LoginComponent } from 'app/views/auth/login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing
    ],
    declarations: [
        LoginComponent,
        LogoutComponent
    ]
})
export class AuthModule { }
