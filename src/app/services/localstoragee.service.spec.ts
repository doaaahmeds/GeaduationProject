import { TestBed } from '@angular/core/testing';

import { LocalstorageeService } from './localstoragee.service';

describe('LocalstorageeService', () => {
  let service: LocalstorageeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
