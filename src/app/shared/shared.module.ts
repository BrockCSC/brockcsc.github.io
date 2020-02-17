import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonDirective } from './button/button.directive';
import { LinkComponent } from './link/link.component';
import { LinkDirective } from './link/link.directive';
import { EventApiService, ExecApiService, StorageService, FoodApiService } from './api/';
import { UploadComponent } from './upload/upload.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { ModalModule } from './modal/modal.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { UploadExistingComponent } from './upload/upload-existing/upload-existing.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ImgComponent } from './img/img.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SlideComponent } from './slideshow/slides/slide.component';
import { FirebaseFormComponent } from './form/firebase-form/firebase-form.component';
import { AnyCastPipe } from './any-cast.pipe';
import { FirebaseFormCreatorComponent } from './form/firebase-form-creator/firebase-form-creator.component';
import { RadioCreatorComponent } from './form/radio-creator/radio-creator.component';
import { TextFieldCreatorComponent } from './form/text-field-creator/text-field-creator.component';
import { CheckboxCreatorComponent } from './form/checkbox-creator/checkbox-creator.component';
import { ProminentContainerComponent } from './prominent-container/prominent-container.component';
import { EventViewComponent } from './event-view/event-view.component';
@NgModule({
    imports: [
        CommonModule,
        ModalModule,
        ReactiveFormsModule,
        FormsModule,
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
        SpinnerComponent,
        ImgComponent,
        SlideshowComponent,
        SlideComponent,
        FirebaseFormComponent,
        FirebaseFormCreatorComponent,
        EventViewComponent,
        ProminentContainerComponent,
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
        SpinnerComponent,
        ImgComponent,
        SlideshowComponent,
        SlideComponent,
        FirebaseFormComponent,
        AnyCastPipe,
        FirebaseFormCreatorComponent,
        RadioCreatorComponent,
        TextFieldCreatorComponent,
        CheckboxCreatorComponent,
        FirebaseFormCreatorComponent,
        ProminentContainerComponent,
        EventViewComponent,
    ],
    providers: [
        EventApiService,
        ExecApiService,
        StorageService,
        FoodApiService,
    ]
})
export class SharedModule { }
