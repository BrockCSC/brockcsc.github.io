import { makeEnvironmentProviders, Type } from '@angular/core';
import { FilesApiService } from './files-api.service';
import { LegacyAngularFireFilesApiService } from './legacy-angular-fire-files-api.service';

export function provideFilesApiService(
  type: Type<FilesApiService> = LegacyAngularFireFilesApiService
) {
  return makeEnvironmentProviders([
    {
      provide: FilesApiService,
      useClass: type,
    },
  ]);
}
