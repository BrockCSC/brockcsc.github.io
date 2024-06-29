import { makeEnvironmentProviders, Type } from '@angular/core';
import { AuthService } from './auth.service';
import { LegacyAngularFireAuthService } from './legacy-angular-fire-auth.service';

export function provideCscAuth(
  type: Type<AuthService> = LegacyAngularFireAuthService
) {
  return makeEnvironmentProviders([
    {
      provide: AuthService,
      useClass: type,
    },
  ]);
}
