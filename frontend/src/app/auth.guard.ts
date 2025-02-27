
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloakService = inject(KeycloakService);

  const isLoggedIn = keycloakService.isLoggedIn();

  if (isLoggedIn) {
    return true;
  } else {
    keycloakService.login();
    return false;
  }
};
