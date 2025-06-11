import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {CookieConsentComponent} from "./components/cookie-consent/cookie-consent.component";
import {FooterComponent} from "./components/footer/footer.component";
import {AgeCheckModalComponent} from "./components/age-check-modal/age-check-modal.component";
import {LoadingOverlayComponent} from "./components/loading-overlay/loading-overlay.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent, CookieConsentComponent, FooterComponent, AgeCheckModalComponent, LoadingOverlayComponent],
  providers: [ ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  loading = true;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
