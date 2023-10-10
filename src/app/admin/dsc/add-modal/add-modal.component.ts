import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DSCApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'csc-add-card-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  public form: UntypedFormGroup;
  @ViewChild('modal') modal: ModalComponent;

  constructor(
    private _DSCApiService: DSCApiService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: new UntypedFormControl(),
      text: new UntypedFormControl(),
      img: {},
      imgAlt: new UntypedFormControl(),
      position: new UntypedFormControl(),
    });
  }

  public add(): void {
    const val = this.form.value;
    this._DSCApiService
      .addCard(val)
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
}
