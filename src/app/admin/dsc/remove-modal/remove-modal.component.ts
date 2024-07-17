import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Card, DSCApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ButtonDirective } from '../../../shared/button/button.directive';
import { ModalFooterComponent } from '../../../shared/modal/modal-footer/modal-footer.component';
import { ModalBodyComponent } from '../../../shared/modal/modal-body/modal-body.component';
import { ModalHeaderComponent } from '../../../shared/modal/modal-header/modal-header.component';
import { ModalComponent as ModalComponent_1 } from '../../../shared/modal/modal.component';

@Component({
  selector: 'csc-remove-card-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss'],
  standalone: true,
  imports: [
    ModalComponent_1,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    ButtonComponent,
  ],
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
