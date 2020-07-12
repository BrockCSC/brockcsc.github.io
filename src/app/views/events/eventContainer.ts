import { CscEvent } from 'app/shared/api';
import { Subscription } from 'rxjs';

export class EventContainer {
  events: CscEvent[];
  loaded: boolean;
  subscription: Subscription;

  constructor() {
    this.events = [];
    this.loaded = false;
    this.subscription = null;
  }
}
