import { makeEnvironmentProviders, Type } from '@angular/core';
import { FoodApiService } from './food.service';
import { LegacyAngularFireFoodApiService } from './legacy-angular-fire-food.service';

export function provideFoodApiService(
  type: Type<FoodApiService> = LegacyAngularFireFoodApiService
) {
  return makeEnvironmentProviders([
    {
      provide: FoodApiService,
      useClass: type,
    },
  ]);
}
