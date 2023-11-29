import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ExecApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'csc-add-exec-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  public form: UntypedFormGroup;
  @ViewChild('modal') modal: ModalComponent;

  constructor(
    private _execApiService: ExecApiService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: new UntypedFormControl(''),
      title: new UntypedFormControl('Executive'),
      description: new UntypedFormControl(''),
      isCurrentExec: new UntypedFormControl(true),
      image: new UntypedFormControl({}),
    });
  }

  public add(exec_role): void {
    const val = this.form.value;
    this._execApiService.addExec(val).then((res) => {
      this.modal.close();
      this.form.reset();
    });
  }

  public open(): void {
    this.modal.open();
  }
}
