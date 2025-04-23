import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { KeycloakAuthService } from "./services/keycloak-auth.service";
import { AuthInterceptor } from './auth.interceptor';

export function initializeKeycloakCustom(keycloakAuthService: KeycloakAuthService) {
  return () => keycloakAuthService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    KeycloakAuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloakCustom,
      multi: true,
      deps: [KeycloakAuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
};
