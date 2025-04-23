import Keycloak from "keycloak-js";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class KeycloakAuthService {
  private keycloakInstance: Keycloak;
  private initPromise: Promise<boolean> | null = null;
  private _initialized = false;

  constructor() {
    this.keycloakInstance = new Keycloak({
      url: "http://localhost:9090",
      realm: "LF12",
      clientId: "lf12",
    });
  }

  init(): Promise<boolean> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise(async (resolve, reject) => {
      try {
        const authenticated = await this.keycloakInstance.init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
          checkLoginIframe: false,
        });
        this._initialized = true;
        resolve(authenticated);
      } catch (error) {
        this._initialized = false;
        this.initPromise = null;
        reject(error);
      }
    });
    return this.initPromise;
  }

  private ensureInitialized(methodName: string): void {
    if (!this._initialized || !this.keycloakInstance) {
      const errorMsg = `KeycloakAuthService: Attempted to call ${methodName} before initialization was complete.`;
      throw new Error(errorMsg);
    }
  }

  login() {
    return this.keycloakInstance.login();
  }

  register() {
    return this.keycloakInstance.register();
  }

  logout(redirectUri: string = window.location.origin) {
    this.ensureInitialized('logout');
    return this.keycloakInstance.logout({ redirectUri: redirectUri });
  }

  isAuthenticated(): boolean {
    return this._initialized && (this.keycloakInstance.authenticated ?? false);
  }

  async getToken(): Promise<string> {
    this.ensureInitialized('getToken');
    try {
      await this.keycloakInstance.updateToken(10);
      return this.keycloakInstance.token!;
    } catch (error) {
      this.logout();
      throw new Error("Failed to refresh token");
    }
  }

  async loadUserProfile(): Promise<Keycloak.KeycloakProfile> {
    this.ensureInitialized('loadUserProfile');
    if (!this.isAuthenticated()) {
      throw new Error("Cannot load profile: User is not authenticated.");
    }
    try {
      return await this.keycloakInstance.loadUserProfile();
    } catch (error) {
      throw new Error("Failed to load user profile");
    }
  }
}
