import { makeEnvironmentProviders, Type } from '@angular/core';
import { ExecApiService } from './exec.service';
import { LegacyAngularFireExecApiService } from './legacy-angular-fire-exec.service';

export function provideExecApiService(
  type: Type<ExecApiService> = LegacyAngularFireExecApiService
) {
  return makeEnvironmentProviders([
    {
      provide: ExecApiService,
      useClass: type,
    },
  ]);
}
