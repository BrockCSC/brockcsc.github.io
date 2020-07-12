import { inject, TestBed } from '@angular/core/testing';

import { FoodApiService } from './food.service';

describe('FoodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodApiService],
    });
  });

  it('should be created', inject(
    [FoodApiService],
    (service: FoodApiService) => {
      expect(service).toBeTruthy();
    }
  ));
});
