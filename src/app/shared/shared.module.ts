import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonDirective } from './button/button.directive';
import { LinkComponent } from './src/app/shared/link/link.component';
import { LinkDirective } from './link/link.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ButtonDirective, ButtonComponent],
    declarations: [ButtonComponent, ButtonDirective, LinkComponent, LinkDirective]
})
export class SharedModule { }
