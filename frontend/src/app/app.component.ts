import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {KeycloakAngularModule} from "keycloak-angular";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {CookieConsentComponent} from "./components/cookie-consent/cookie-consent.component";
import {FooterComponent} from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, KeycloakAngularModule, SidebarComponent, NavbarComponent, CookieConsentComponent, FooterComponent],
  providers: [ ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  constructor() {
    }



}
