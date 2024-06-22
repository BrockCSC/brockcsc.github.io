import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'csc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
})
export class ModalComponent {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClose: EventEmitter<void>;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onOpen: EventEmitter<void>;
  public closed: boolean;

  constructor() {
    this.onClose = new EventEmitter<void>();
    this.onOpen = new EventEmitter<void>();
    this.closed = true;
  }

  public close(): void {
    this.onClose.emit();
    this.closed = true;
  }

  public open(): void {
    this.onOpen.emit();
    this.closed = false;
  }
}
