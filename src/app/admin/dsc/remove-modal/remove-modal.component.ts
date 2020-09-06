import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Card, DSCApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'csc-remove-card-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss'],
})
export class RemoveModalComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  toRemove: Card;

  constructor(private _DSCApiService: DSCApiService) {}

  public removeCard(): void {
    this._DSCApiService
      .removeCard(this.toRemove)
      .then((res) => {
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

  public ngOnInit(): void {}
}
