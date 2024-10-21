import { TestBed } from '@angular/core/testing';

import { CardExchangeService } from './card-exchange.service';

describe('CardExchangeService', () => {
  let service: CardExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
