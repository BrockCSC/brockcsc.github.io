import { TestBed } from '@angular/core/testing';

import { FilesApiService } from './files-api.service';

describe('FilesApiService', () => {
  let service: FilesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
