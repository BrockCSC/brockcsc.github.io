import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EventApiService } from 'app/shared/api';
import { CscEvent } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { emptyForm, FormInfo, randomUid } from '../../../shared/api/form/form';
import { FormApiService } from '../../../shared/api/form/form-api.service';

@Component({
  selector: 'csc-add-modal',
  templateUrl: '../add-edit-modal.component.html',
})
export class AddModalComponent implements OnInit {
  public form: FormGroup;
  @ViewChild('modal') modal: ModalComponent;
  eventForm: FormInfo = emptyForm();
  includeForm = true;
  includeLink = false;
  includeGoogleForm = false;
  edit = false;

  constructor(
    private _eventApiService: EventApiService,
    private _formBuilder: FormBuilder,
    private _formApiService: FormApiService
  ) {}

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
      tentative: false,
      dscEvent: false,
      hiddenDate: false,
      customDate: '',
    });
  }

  public add(): void {
    const val = this.form.value as CscEvent;
    if (this.eventForm.fields.length === 0) {
      this.includeForm = false;
    }
    if (this.includeForm) {
      val.formId = randomUid(10);
      this._formApiService.setForm(this.eventForm, val.formId);
    }
    if (!this.includeLink) {
      val.signupUrl = null;
    }

    if (!this.includeGoogleForm) {
      val.googleFormUrl = null;
    }

    val.datetime.timeStartTimestamp = new Date(
      `${val.datetime.date} ${val.datetime.timeStart}`
    ).valueOf();
    val.datetime.timeEndTimestamp = new Date(
      `${val.datetime.date} ${val.datetime.timeEnd}`
    ).valueOf();
    this._eventApiService
      .addEvent(val)
      .then((res) => {
        this.modal.close();
        this.form.reset();
      })
      .catch((error) => {
        console.error(error);
      });
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
