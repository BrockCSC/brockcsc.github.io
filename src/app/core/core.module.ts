import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routing } from 'app/app.router';
import { SharedModule } from 'app/shared/shared.module';
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
})
export class CoreModule {}
