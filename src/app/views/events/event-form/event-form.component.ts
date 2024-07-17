import { Component } from '@angular/core';
import { FirebaseFormComponent } from '../../../shared/form/firebase-form/firebase-form.component';

@Component({
  selector: 'csc-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  standalone: true,
  imports: [FirebaseFormComponent],
})
export class EventFormComponent {}
