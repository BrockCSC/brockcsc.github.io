import { makeEnvironmentProviders, Type } from '@angular/core';
import { FormApiService } from './form-api.service';
import { LegacyAngularFireFormApiService } from './legacy-angular-fire-form-api.service';

export function provideFormApiService(
  type: Type<FormApiService> = LegacyAngularFireFormApiService
) {
  return makeEnvironmentProviders([
    {
      provide: FormApiService,
      useClass: type,
    },
  ]);
}
