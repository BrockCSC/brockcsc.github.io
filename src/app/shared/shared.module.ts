import { NgModule } from '@angular/core';
import { EventCardComponent } from 'app/shared/event-card/event-card.component';
import { ButtonComponent } from './button/button.component';
import { ButtonDirective } from './button/button.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { EventViewComponent } from './event-view/event-view.component';
import { FirebaseFormCreatorComponent } from './form/firebase-form-creator/firebase-form-creator.component';
import { FirebaseFormComponent } from './form/firebase-form/firebase-form.component';
import { GoogleFormComponent } from './form/google-form/google-form.component';
import { ImgSlideshowComponent } from './img-slideshow/img-slideshow.component';
import { ImgComponent } from './img/img.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { LinkComponent } from './link/link.component';
import { LinkDirective } from './link/link.directive';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProminentContainerComponent } from './prominent-container/prominent-container.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { UploadExistingComponent } from './upload/upload-existing/upload-existing.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  imports: [
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
    FirebaseFormCreatorComponent,
    ProminentContainerComponent,
    EventViewComponent,
    GoogleFormComponent,
    ImgSlideshowComponent,
    EventCardComponent,
  ],
  exports: [
    ButtonDirective,
    ButtonComponent,
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
    FirebaseFormCreatorComponent,
    EventViewComponent,
    ProminentContainerComponent,
    GoogleFormComponent,
    ImgSlideshowComponent,
    EventCardComponent,
  ],
})
export class SharedModule {}
