import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Exec } from 'app/shared/api/exec/exec';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { ExecApiService } from './../../../shared/api/exec/exec.service';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ButtonDirective } from '../../../shared/button/button.directive';
import { ModalFooterComponent } from '../../../shared/modal/modal-footer/modal-footer.component';
import { ModalBodyComponent } from '../../../shared/modal/modal-body/modal-body.component';
import { ModalHeaderComponent } from '../../../shared/modal/modal-header/modal-header.component';
import { ModalComponent as ModalComponent_1 } from '../../../shared/modal/modal.component';

@Component({
  selector: 'csc-remove-exec-modal',
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
  @Input() checkedExecs: Exec[] = [];
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _execApiService: ExecApiService) {}

  public removeExecs(): void {
    this._execApiService
      .removeExecs(this.checkedExecs)
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
