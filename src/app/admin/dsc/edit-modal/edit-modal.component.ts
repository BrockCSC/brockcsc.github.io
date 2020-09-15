import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Card, CscFile, DSCApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'csc-edit-card-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  public form: FormGroup;
  public editableCard: Card;
  @ViewChild('modal') modal: ModalComponent;

  constructor(
    private _foodApiService: DSCApiService,
    private _formBuilder: FormBuilder
  ) {}

  public open(card: Card) {
    this.editableCard = card;
    this.form.patchValue(this.editableCard);
    this.modal.open();
  }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: new FormControl(),
      text: new FormControl(),
      img: {},
      imgAlt: new FormControl(),
      position: new FormControl(),
    });
  }

  public update(): void {
    const key = this.editableCard.$key;
    const data = this.form.value;
    alert(data.img);
    this._foodApiService
      .updateFoodItem(key, data)
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
