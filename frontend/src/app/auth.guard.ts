import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakAuthService } from './services/keycloak-auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloakAuthService = inject(KeycloakAuthService);
  const router = inject(Router);

  const isLoggedIn = keycloakAuthService.isAuthenticated();

  if (isLoggedIn) {
    return true;
  } else {
    await keycloakAuthService.login();
    return false;
  }
};
