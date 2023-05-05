import { TestBed } from '@angular/core/testing';

import { CartServService } from './cart-serv.service';

describe('CartServService', () => {
  let service: CartServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
