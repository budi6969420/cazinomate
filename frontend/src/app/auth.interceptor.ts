import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { KeycloakAuthService } from './services/keycloak-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloakAuthService: KeycloakAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.keycloakAuthService.isAuthenticated()) {
      return from(this.keycloakAuthService.getToken()).pipe(
        switchMap(token => {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(request);
        }),
        catchError(error => {
          return throwError(() => new Error("Failed to acquire token for request."));
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
