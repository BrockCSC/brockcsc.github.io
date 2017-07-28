import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonDirective } from './button/button.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ButtonDirective, ButtonComponent],
    declarations: [ButtonComponent, ButtonDirective]
})
export class SharedModule { }
