import { TestBed } from '@angular/core/testing';

import { TranslatessService } from './translatess.service';

describe('TranslatessService', () => {
  let service: TranslatessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
