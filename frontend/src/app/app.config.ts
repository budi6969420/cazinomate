import {APP_INITIALIZER, ApplicationConfig, LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { KeycloakAuthService } from "./services/keycloak-auth.service";
import { AuthInterceptor } from './auth.interceptor';
import {registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';

export function initializeKeycloakCustom(keycloakAuthService: KeycloakAuthService) {
  return () => keycloakAuthService.init();
}

registerLocaleData(localeDe);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE'},
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
