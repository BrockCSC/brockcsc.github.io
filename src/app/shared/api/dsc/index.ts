import { makeEnvironmentProviders, Type } from '@angular/core';
import { DSCApiService } from './dsc.service';
import { LegacyAngularFireDSCApiService } from './legacy-angular-fire-dsc.service';

export function provideDSCApiService(
  type: Type<DSCApiService> = LegacyAngularFireDSCApiService
) {
  return makeEnvironmentProviders([
    {
      provide: DSCApiService,
      useClass: type,
    },
  ]);
}
