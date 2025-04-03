import { TestBed } from '@angular/core/testing';

import { KeycloakAuthService } from './keycloak-auth.service';

describe('KeycloakAuthService', () => {
  let service: KeycloakAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
