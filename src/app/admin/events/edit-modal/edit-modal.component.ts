import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EventApiService } from 'app/shared/api';
import { CscEvent, CscFile } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { emptyForm, FormInfo, randomUid } from '../../../shared/api/form/form';
import { FormApiService } from '../../../shared/api/form/form-api.service';

@Component({
  selector: 'csc-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  public form: FormGroup;
  public editableEvent: CscEvent;
  @ViewChild('modal') modal: ModalComponent;
  public eventForm: FormInfo = emptyForm();
  includeForm = false;
  includeGoogleForm: boolean;
  includeLink: boolean;

  constructor(
    private _eventApiService: EventApiService,
    private _formBuilder: FormBuilder,
    private _formApiService: FormApiService
  ) {}

  public open(event: CscEvent) {
    this.eventForm = emptyForm();
    this.editableEvent = event;
    this.includeForm = !!event.formId;
    this.includeLink = !!event.signupUrl;
    this.includeGoogleForm = !!event.googleFormUrl;
    this.form.patchValue(this.editableEvent);
    if (event.formId) {
      this._formApiService
        .getFormOnce(this.editableEvent.formId)
        .subscribe((value: FormInfo) => {
          this.eventForm = value;
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
        date: '',
        timeStart: '',
        timeEnd: '',
      }),
      location: '',
      resources: new FormControl([]),
      image: {},
      signupUrl: '',
      googleFormUrl: '',
      gallery: new FormControl([]),
    });
  }

  public update(): void {
    const key = this.editableEvent.$key;
    const data = this.form.value as CscEvent;
    data.datetime.timeStartTimestamp = new Date(
      `${data.datetime.date} ${data.datetime.timeStart}`
    ).valueOf();
    data.datetime.timeEndTimestamp = new Date(
      `${data.datetime.date} ${data.datetime.timeEnd}`
    ).valueOf();
    if (this.eventForm.fields.length === 0) {
      this.includeForm = false;
    }
    if (!this.includeForm) {
      // Disassociate the form from event, but stays in db.
      data.formId = null;
    } else {
      if (!this.editableEvent.formId) {
        console.log('Not form id');
        data.formId = randomUid(10);
      } else {
        data.formId = this.editableEvent.formId;
      }
      console.log(`Updating ${data.formId}`);
      this._formApiService
        .setForm(this.eventForm, data.formId)
        .catch((error: Error) => {
          console.log('Error updating form');
          console.error(error);
        });
    }

    if (!this.includeLink) {
      data.signupUrl = null;
    }

    if (!this.includeGoogleForm) {
      data.googleFormUrl = null;
    }

    this._eventApiService
      .updateEvent(key, data)
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
    return (
      this.editableEvent !== undefined && this.editableEvent.image !== undefined
    );
  }

  public getImage(): CscFile[] {
    if (this.hasImage()) {
      return new Array(this.editableEvent.image);
    }
    return [];
  }

  public hasUpload(name: string): boolean {
    return (
      this.editableEvent !== undefined && this.editableEvent[name] !== undefined
    );
  }

  public getUpload(name: string): CscFile[] {
    if (this.hasUpload(name)) {
      return this.editableEvent[name];
    }
    return [];
  }
}
