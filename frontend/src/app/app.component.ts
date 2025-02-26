import {APP_INITIALIZER, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HelloListComponent} from "./hello-list/hello-list.component";
import {KeycloakAngularModule} from "keycloak-angular";
import {SidebarComponent} from "./elements/sidebar/sidebar.component";
import {NavbarComponent} from "./elements/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HelloListComponent, RouterOutlet, KeycloakAngularModule, SidebarComponent, NavbarComponent],
  providers: [ ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

  constructor() {
    }



}
