import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private keycloakService: KeycloakService) {
  }

  async onLogin() {
    await this.keycloakService.login();
  }

  async onRegister() {
    await this.keycloakService.register();
  }
}
