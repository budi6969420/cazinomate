import { TestBed } from '@angular/core/testing';

import { SelfUserService } from './self-user.service';

describe('SelfUserService', () => {
  let service: SelfUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
