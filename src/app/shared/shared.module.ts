import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonDirective } from './button/button.directive';
import { LinkComponent } from './link/link.component';
import { LinkDirective } from './link/link.directive';
import { EventApiService, FileService } from './api/';
import { UploadComponent, UploadService } from './upload';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ButtonDirective, ButtonComponent, LinkComponent, LinkDirective, UploadComponent, ProgressBarComponent],
    declarations: [ButtonComponent, ButtonDirective, LinkComponent, LinkDirective, UploadComponent, ProgressBarComponent],
    providers: [EventApiService, FileService, UploadService]
})
export class SharedModule { }
