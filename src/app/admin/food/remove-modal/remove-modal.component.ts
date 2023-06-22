import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Food, FoodApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'csc-remove-food-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss'],
})
export class RemoveModalComponent {
  @ViewChild('modal') modal: ModalComponent;
  @Input() checkedFoodItems: Food[] = [];
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _execApiService: FoodApiService) {}

  public removeFoodItems(): void {
    this._execApiService
      .removeFoodItems(this.checkedFoodItems)
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
