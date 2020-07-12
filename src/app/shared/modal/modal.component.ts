import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'csc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Output() onClose: EventEmitter<void>;
  @Output() onOpen: EventEmitter<void>;
  public closed: boolean;

  constructor() {
    this.onClose = new EventEmitter<void>();
    this.onOpen = new EventEmitter<void>();
    this.closed = true;
  }

  ngOnInit() {}

  public close(): void {
    this.onClose.emit();
    this.closed = true;
  }

  public open(): void {
    this.onOpen.emit();
    this.closed = false;
  }
}
