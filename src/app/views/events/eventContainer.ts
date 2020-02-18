import { Subscription } from 'rxjs';
import { CscEvent } from 'app/shared/api';

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
