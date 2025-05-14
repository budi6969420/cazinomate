import { TestBed } from '@angular/core/testing';

import { PayoutItemService } from './payout-item.service';

describe('PayoutItemService', () => {
  let service: PayoutItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayoutItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
