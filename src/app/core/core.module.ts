import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from 'app/shared/shared.module';
import { routing } from 'app/app.router';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing
    ],
    exports: [
        NavComponent,
        FooterComponent
    ],
    declarations: [NavComponent, FooterComponent],
    providers: [AuthService, AuthGuard]
})
export class CoreModule { }
