import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonDirective } from './button/button.directive';
import { LinkComponent } from './link/link.component';
import { LinkDirective } from './link/link.directive';
import { EventApiService } from './api/';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ButtonDirective, ButtonComponent, LinkComponent, LinkDirective],
    declarations: [ButtonComponent, ButtonDirective, LinkComponent, LinkDirective],
    providers: [EventApiService]
})
export class SharedModule { }
