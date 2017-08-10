import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonDirective } from './button/button.directive';
import { LinkComponent } from './link/link.component';
import { LinkDirective } from './link/link.directive';
import { EventApiService, StorageService } from './api/';
import { UploadComponent } from './upload/upload.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { ModalModule } from './modal/modal.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { UploadExistingComponent } from './upload/upload-existing/upload-existing.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    imports: [
        CommonModule,
        ModalModule
    ],
    exports: [
        ButtonDirective,
        ButtonComponent,
        LinkComponent,
        LinkDirective,
        UploadComponent,
        ProgressBarComponent,
        InputContainerComponent,
        ModalModule,
        CheckboxComponent,
        UploadExistingComponent,
        TooltipComponent,
        SpinnerComponent
    ],
    declarations: [
        ButtonComponent,
        ButtonDirective,
        LinkComponent,
        LinkDirective,
        UploadComponent,
        ProgressBarComponent,
        InputContainerComponent,
        CheckboxComponent,
        UploadExistingComponent,
        TooltipComponent,
        SpinnerComponent
    ],
    providers: [
        EventApiService,
        StorageService
    ]
})
export class SharedModule { }
