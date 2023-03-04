import { TestBed } from '@angular/core/testing';

import { SortProductsService } from './sort-products.service';

describe('SortProductsService', () => {
  let service: SortProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
