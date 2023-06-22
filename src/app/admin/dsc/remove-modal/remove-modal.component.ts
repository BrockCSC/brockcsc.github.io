import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Card, DSCApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'csc-remove-card-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss'],
})
export class RemoveModalComponent {
  @ViewChild('modal') modal: ModalComponent;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  toRemove: Card;

  constructor(private _dscApiService: DSCApiService) {}

  public removeCard(): void {
    this._dscApiService
      .removeCard(this.toRemove)
      .then(() => {
        this.modal.close();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public open(card: Card): void {
    this.toRemove = card;
    this.modal.open();
  }
}
