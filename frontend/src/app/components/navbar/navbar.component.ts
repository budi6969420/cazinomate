import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {KeycloakAuthService} from "../../services/keycloak-auth.service";
import {UserService} from "../../services/user.service";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(protected keycloakService: KeycloakAuthService, protected userService: UserService) {
  }

  async onLogin() {
    await this.keycloakService.login();
    this.userService.updateSelfUserInfo().subscribe()
    this.userService.updateSelfBalance().subscribe()
  }

  async onRegister() {
    await this.keycloakService.register();
    this.userService.updateSelfUserInfo().subscribe();
    this.userService.updateSelfBalance().subscribe();
  }

  async onLogout() {
    await this.keycloakService.logout();
    this.userService.onLogout();
  }
}
