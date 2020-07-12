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
import { Food, FoodApiService } from 'app/shared/api';
import { ModalComponent } from 'app/shared/modal/modal.component';

@Component({
  selector: 'csc-remove-food-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss'],
})
export class RemoveModalComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  @Input() checkedFoodItems: Food[] = [];
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _execApiService: FoodApiService) {}

  public removeFoodItems(): void {
    this._execApiService
      .removeFoodItems(this.checkedFoodItems)
      .then((res) => {
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

  public ngOnInit(): void {}
}
