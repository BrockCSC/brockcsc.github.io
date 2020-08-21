import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnyCastPipe } from './any-cast.pipe';
import {
  DSCApiService,
  EventApiService,
  ExecApiService,
  FoodApiService,
  StorageService,
} from './api/';
import { ButtonComponent } from './button/button.component';
import { ButtonDirective } from './button/button.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { EventViewComponent } from './event-view/event-view.component';
import { CheckboxCreatorComponent } from './form/checkbox-creator/checkbox-creator.component';
import { FirebaseFormCreatorComponent } from './form/firebase-form-creator/firebase-form-creator.component';
import { FirebaseFormComponent } from './form/firebase-form/firebase-form.component';
import { GoogleFormComponent } from './form/google-form/google-form.component';
import { RadioCreatorComponent } from './form/radio-creator/radio-creator.component';
import { TextFieldCreatorComponent } from './form/text-field-creator/text-field-creator.component';
import { ImgSlideshowComponent } from './img-slideshow/img-slideshow.component';
import { ImgComponent } from './img/img.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { LinkComponent } from './link/link.component';
import { LinkDirective } from './link/link.directive';
import { ModalModule } from './modal/modal.module';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProminentContainerComponent } from './prominent-container/prominent-container.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { UploadExistingComponent } from './upload/upload-existing/upload-existing.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  imports: [CommonModule, ModalModule, ReactiveFormsModule, FormsModule],
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
    FirebaseFormComponent,
    FirebaseFormCreatorComponent,
    EventViewComponent,
    ProminentContainerComponent,
    GoogleFormComponent,
    ImgSlideshowComponent,
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
    FirebaseFormComponent,
    AnyCastPipe,
    FirebaseFormCreatorComponent,
    RadioCreatorComponent,
    TextFieldCreatorComponent,
    CheckboxCreatorComponent,
    FirebaseFormCreatorComponent,
    ProminentContainerComponent,
    EventViewComponent,
    GoogleFormComponent,
    ImgSlideshowComponent,
  ],
  providers: [
    EventApiService,
    ExecApiService,
    StorageService,
    FoodApiService,
    DSCApiService,
  ],
})
export class SharedModule {}
