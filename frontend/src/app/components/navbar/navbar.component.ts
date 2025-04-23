import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import Keycloak from "keycloak-js";
import {KeycloakAuthService} from "../../services/keycloak-auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
    selector: 'app-navbar',
    imports: [],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(protected  keycloakService: KeycloakAuthService) {
  }

  async onLogin() {
    await this.keycloakService.login();
  }

  async onRegister() {
    await this.keycloakService.register();
  }

  async onLogout() {
    await this.keycloakService.logout();
  }
}
