import { TestBed } from '@angular/core/testing';

import { ShopPackageService } from './shopPackage.service';

describe('PackageService', () => {
  let service: ShopPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
