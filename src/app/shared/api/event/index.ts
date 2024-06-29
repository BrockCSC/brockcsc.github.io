import { makeEnvironmentProviders, Type } from '@angular/core';
import { EventApiService } from './event.service';
import { LegacyAngularFireEventApiService } from './legacy-angular-fire-event.service';

export function provideEventApiService(
  type: Type<EventApiService> = LegacyAngularFireEventApiService
) {
  return makeEnvironmentProviders([
    {
      provide: EventApiService,
      useClass: type,
    },
  ]);
}
