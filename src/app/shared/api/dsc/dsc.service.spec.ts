import { inject, TestBed } from '@angular/core/testing';

import { DSCApiService } from './dsc.service';

describe('DSCService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DSCApiService],
    });
  });

  it('should be created', inject([DSCApiService], (service: DSCApiService) => {
    expect(service).toBeTruthy();
  }));
});
