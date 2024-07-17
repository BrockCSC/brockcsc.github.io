import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CscEvent, CscFile, EventApiService } from 'app/shared/api';
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
  selector: 'csc-edit-modal',
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
export class EditModalComponent implements OnInit {
  public form: UntypedFormGroup;
  public editableEvent: CscEvent;
  @ViewChild('modal') modal: ModalComponent;
  public eventForm: FormInfo = emptyForm();
  includeForm = false;
  includeGoogleForm: boolean;
  includeLink: boolean;
  edit = true;

  constructor(
    private _eventApiService: EventApiService,
    private _formBuilder: UntypedFormBuilder,
    private _formApiService: FormApiService
  ) {}

  public open(event: CscEvent) {
    this.eventForm = emptyForm();
    this.editableEvent = event;
    this.includeForm = !!event.formId;
    this.includeLink = !!event.signupUrl;
    this.includeGoogleForm = !!event.googleFormUrl;

    this.form.patchValue(this.formFromEvent(this.editableEvent));
    if (event.formId) {
      this._formApiService.getFormOnce(this.editableEvent.formId).subscribe({
        next: (value: FormInfo) => {
          this.eventForm = value;
        },
      });
    }
    this.modal.open();
  }

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

  private toDateTimeLocalString(timestamp: number): string {
    const date = new Date(timestamp);

    const timezone = 'America/Toronto';

    const year = date.toLocaleString('en-US', {
      timeZone: timezone,
      year: 'numeric',
    });
    const month = date.toLocaleString('en-US', {
      timeZone: timezone,
      month: '2-digit',
    });
    const day = date.toLocaleString('en-US', {
      timeZone: timezone,
      day: '2-digit',
    });
    const time = date.toLocaleString('en-US', {
      timeZone: timezone,
      timeStyle: 'short',
      hour12: false,
    });

    return `${year}-${month}-${day}T${time}`; // YYYY-MM-DDTHH:II
  }

  private formFromEvent(event: CscEvent): any {
    return {
      formId: event.formId,
      title: event.title,
      presenter: event.presenter,
      description: event.description,
      location: event.location,
      signupUrl: event.signupUrl,
      googleFormUrl: event.googleFormUrl,
      tentative: event.tentative,
      dscEvent: event.dscEvent,
      hiddenDate: event.hiddenDate,
      customDate: event.customDate,
      image: event.image,
      gallery: event.gallery,
      resources: event.resources,
      datetime: {
        startDatetime: this.toDateTimeLocalString(
          event.datetime.timeStartTimestamp
        ),
        endDatetime: this.toDateTimeLocalString(
          event.datetime.timeEndTimestamp
        ),
      },
    };
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

  public update(): void {
    const key = this.editableEvent.$key;

    if (this.eventForm.fields.length === 0) {
      this.includeForm = false;
    }

    let event: CscEvent;
    if (this.includeForm) {
      const formId = this.editableEvent.formId ?? randomUid(10);
      event = this.parseCscEvent(this.form.value, formId);
      this._formApiService
        .setForm(this.eventForm, event.formId)
        .catch((error) => console.error(error));
    } else {
      event = this.parseCscEvent(this.form.value);
    }

    this._eventApiService
      .updateEvent(key, event)
      .then(() => {
        this.modal.close();
        this.form.reset();
      })
      .catch((error: Error) => {
        console.log('Error updating event');
        console.error(error);
      });
  }

  public hasImage(): boolean {
    return this.editableEvent && !!this.editableEvent.image;
  }

  public getImage(): CscFile[] {
    if (this.hasImage()) {
      return new Array(this.editableEvent.image);
    }
    return [];
  }

  public hasUpload(name: string): boolean {
    return this.editableEvent && !!this.editableEvent[name];
  }

  public getUpload(name: string): CscFile[] {
    if (this.hasUpload(name)) {
      return this.editableEvent[name];
    }
    return [];
  }

  add() {}
}
