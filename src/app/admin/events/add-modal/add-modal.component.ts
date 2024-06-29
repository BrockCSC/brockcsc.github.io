import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CscEvent, EventApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { FormInfo, emptyForm, randomUid } from '../../../shared/api/form/form';
import { FormApiService } from '../../../shared/api/form/form-api.service';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ButtonDirective } from '../../../shared/button/button.directive';
import { ModalFooterComponent } from '../../../shared/modal/modal-footer/modal-footer.component';
import { UploadComponent } from '../../../shared/upload/upload.component';
import { FirebaseFormCreatorComponent } from '../../../shared/form/firebase-form-creator/firebase-form-creator.component';
import { ProminentContainerComponent } from '../../../shared/prominent-container/prominent-container.component';
import { NgIf } from '@angular/common';
import { CheckboxComponent } from '../../../shared/checkbox/checkbox.component';
import { InputContainerComponent } from '../../../shared/input-container/input-container.component';
import { ModalBodyComponent } from '../../../shared/modal/modal-body/modal-body.component';
import { ModalHeaderComponent } from '../../../shared/modal/modal-header/modal-header.component';
import { ModalComponent as ModalComponent_1 } from '../../../shared/modal/modal.component';

@Component({
  selector: 'csc-add-modal',
  templateUrl: '../add-edit-modal.component.html',
  standalone: true,
  imports: [
    ModalComponent_1,
    ModalHeaderComponent,
    ModalBodyComponent,
    ReactiveFormsModule,
    InputContainerComponent,
    CheckboxComponent,
    FormsModule,
    NgIf,
    ProminentContainerComponent,
    FirebaseFormCreatorComponent,
    UploadComponent,
    ModalFooterComponent,
    ButtonDirective,
    ButtonComponent,
  ],
})
export class AddModalComponent implements OnInit {
  public form: UntypedFormGroup;
  @ViewChild('modal') modal: ModalComponent;
  eventForm: FormInfo = emptyForm();
  includeForm = true;
  includeLink = false;
  includeGoogleForm = false;
  edit = false;

  constructor(
    private _eventApiService: EventApiService,
    private _formBuilder: UntypedFormBuilder,
    private _formApiService: FormApiService
  ) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: '',
      presenter: '',
      description: '',
      datetime: this._formBuilder.group({
        startDatetime: '',
        endDatetime: '',
      }),
      location: '',
      resources: new UntypedFormControl([]),
      image: {},
      signupUrl: '',
      googleFormUrl: '',
      gallery: new UntypedFormControl([]),
      tentative: false,
      dscEvent: false,
      hiddenDate: false,
      customDate: '',
    });
  }

  public add(): void {
    if (this.eventForm.fields.length === 0) {
      this.includeForm = false;
    }

    let event: CscEvent;
    if (this.includeForm) {
      const formId = randomUid(10);
      event = this.parseCscEvent(this.form.value, formId);
      this._formApiService
        .setForm(this.eventForm, event.formId)
        .catch((error) => console.error(error));
    } else {
      event = this.parseCscEvent(this.form.value);
    }

    this._eventApiService
      .addEvent(event)
      .then(() => {
        this.modal.close();
        this.form.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private parseCscEvent(value: any, formId?: string): CscEvent {
    return {
      formId: formId ?? null,
      title: value.title,
      presenter: value.presenter,
      description: value.description,
      location: value.location,
      signupUrl: this.includeLink ? value.signupUrl : null,
      googleFormUrl: this.includeGoogleForm ? value.googleFormUrl : null,
      tentative: value.tentative,
      dscEvent: value.dscEvent,
      hiddenDate: value.hiddenDate,
      customDate: value.customDate,
      image: value.image,
      gallery: value.gallery,
      resources: value.resources,
      datetime: {
        timeStartTimestamp: Date.parse(value.datetime.startDatetime),
        timeEndTimestamp: Date.parse(value.datetime.endDatetime),
      },
    } as CscEvent;
  }

  public open(): void {
    this.modal.open();
  }

  update() {}

  getUpload(s: string) {
    return null;
  }

  getImage() {
    return null;
  }
}
