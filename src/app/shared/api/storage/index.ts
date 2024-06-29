import { makeEnvironmentProviders, Type } from '@angular/core';
import { LegacyAngularFireStorageService } from './legacy-angular-fire-storage.service';
import { StorageService } from './storage.service';

export function provideStorageService(
  type: Type<StorageService> = LegacyAngularFireStorageService
) {
  return makeEnvironmentProviders([
    {
      provide: StorageService,
      useClass: type,
    },
  ]);
}
