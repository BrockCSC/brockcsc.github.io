import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routing } from 'app/app.router';
import { SharedModule } from 'app/shared/shared.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    routing,
    NavComponent,
    FooterComponent,
  ],
  exports: [NavComponent, FooterComponent],
  providers: [AuthService, AuthGuard],
})
export class CoreModule {}
