import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CscEvent, EventApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { FormInfo, emptyForm, randomUid } from '../../../shared/api/form/form';
import { FormApiService } from '../../../shared/api/form/form-api.service';

@Component({
  selector: 'csc-add-modal',
  templateUrl: '../add-edit-modal.component.html',
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
