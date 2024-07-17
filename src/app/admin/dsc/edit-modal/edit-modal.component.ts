import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Card, CscFile, DSCApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ButtonDirective } from '../../../shared/button/button.directive';
import { ModalFooterComponent } from '../../../shared/modal/modal-footer/modal-footer.component';
import { UploadComponent } from '../../../shared/upload/upload.component';
import { InputContainerComponent } from '../../../shared/input-container/input-container.component';
import { ModalBodyComponent } from '../../../shared/modal/modal-body/modal-body.component';
import { ModalHeaderComponent } from '../../../shared/modal/modal-header/modal-header.component';
import { ModalComponent as ModalComponent_1 } from '../../../shared/modal/modal.component';

@Component({
  selector: 'csc-edit-card-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  standalone: true,
  imports: [
    ModalComponent_1,
    ModalHeaderComponent,
    ModalBodyComponent,
    ReactiveFormsModule,
    InputContainerComponent,
    UploadComponent,
    ModalFooterComponent,
    ButtonDirective,
    ButtonComponent,
  ],
})
export class EditModalComponent implements OnInit {
  public form: UntypedFormGroup;
  public editableCard: Card;
  @ViewChild('modal') modal: ModalComponent;

  constructor(
    private _dscApiService: DSCApiService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  public open(card: Card) {
    this.editableCard = card;
    this.form.patchValue(this.editableCard);
    this.modal.open();
  }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: new UntypedFormControl(),
      text: new UntypedFormControl(),
      img: {},
      imgAlt: new UntypedFormControl(),
      position: new UntypedFormControl(),
    });
  }

  public update(): void {
    const key = this.editableCard.$key;
    const data = this.form.value;
    alert(data.img);
    this._dscApiService
      .updateCard(key, data)
      .then(() => {
        this.modal.close();
        this.form.reset();
      })
      .catch((error: Error) => {
        console.log('Error updating card');
        console.error(error);
      });
  }

  public getImage(): CscFile[] {
    if (this.editableCard && !!this.editableCard.img) {
      return new Array(this.editableCard.img);
    }
    return [];
  }
}
