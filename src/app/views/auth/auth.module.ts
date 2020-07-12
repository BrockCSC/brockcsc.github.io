import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { LoginComponent } from 'app/views/auth/login/login.component';
import { routing } from './auth.router';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [CommonModule, SharedModule, routing, RouterModule],
  declarations: [LoginComponent, LogoutComponent],
})
export class AuthModule {}
