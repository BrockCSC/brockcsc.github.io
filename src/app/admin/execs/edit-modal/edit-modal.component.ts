import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CscFile, Exec, ExecApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'csc-edit-exec-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  public form: UntypedFormGroup;
  public editableExec: Exec;
  @ViewChild('modal') modal: ModalComponent;

  constructor(
    private _execApiService: ExecApiService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  public open(exec: Exec) {
    this.editableExec = exec;
    this.form.patchValue(this.editableExec);
    this.modal.open();
  }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: new UntypedFormControl(''),
      title: new UntypedFormControl('Executive'),
      description: new UntypedFormControl(''),
      isCurrentExec: new UntypedFormControl(true),
      image: new UntypedFormControl({}),
    });
  }

  public update(): void {
    const key = this.editableExec.$key;
    const data = this.form.value;
    this._execApiService
      .updateExec(key, data)
      .then(() => {
        this.modal.close();
        this.form.reset();
      })
      .catch((error: Error) => {
        console.log('Error updating exec');
        console.error(error);
      });
  }

  public hasImage(): boolean {
    return (
      this.editableExec !== undefined && this.editableExec.image !== undefined
    );
  }

  public getImage(): CscFile[] {
    if (this.hasImage()) {
      return new Array(this.editableExec.image);
    }
    return [];
  }
}
