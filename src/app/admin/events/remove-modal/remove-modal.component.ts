import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CscEvent, EventApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ButtonDirective } from '../../../shared/button/button.directive';
import { ModalFooterComponent } from '../../../shared/modal/modal-footer/modal-footer.component';
import { ModalBodyComponent } from '../../../shared/modal/modal-body/modal-body.component';
import { ModalHeaderComponent } from '../../../shared/modal/modal-header/modal-header.component';
import { ModalComponent as ModalComponent_1 } from '../../../shared/modal/modal.component';

@Component({
  selector: 'csc-remove-modal',
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
  @Input() checkedEvents: CscEvent[] = [];
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _eventApiService: EventApiService) {}

  public removeEvents(): void {
    this._eventApiService
      .removeEvents(this.checkedEvents)
      .then(() => {
        this.onDelete.emit();
        this.modal.close();
      })
      .catch((error) => {
        console.error('Error encountered', error);
      });
  }

  public open(): void {
    this.modal.open();
  }
}
