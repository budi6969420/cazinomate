import Keycloak from "keycloak-js";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class KeycloakAuthService {
  private keycloak: Keycloak;

  constructor() {
    this.keycloak = new Keycloak({
      url: "http://localhost:9090",
      realm: "LF12",
      clientId: "lf12",
    });
  }

  async init() {
    try {
      await this.keycloak.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
        checkLoginIframe: false,
        redirectUri: window.location.origin,
      });
      console.log("✅ Keycloak initialized");
    } catch (error) {
      console.error("❌ Keycloak initialization failed", error);
    }
  }

  login() {
    return this.keycloak.login();
  }

  register() {
    return this.keycloak.register();
  }

  logout() {
    return this.keycloak.logout();
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated || false;
  }
}
