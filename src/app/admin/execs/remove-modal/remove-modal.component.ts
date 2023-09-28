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

@Component({
  selector: 'csc-remove-exec-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss'],
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
