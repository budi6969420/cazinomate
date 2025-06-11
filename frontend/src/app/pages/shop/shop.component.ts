import {Component, OnInit} from '@angular/core';
import {ShopPackageComponent} from "../../components/shopPackage/shopPackage.component";
import {ShopPackageService} from "../../services/shopPackage.service";
import {BuyConfirmationModalComponent} from "../../components/buy-confirmation-modal/buy-confirmation-modal.component";
import {ShopPackage} from "../../models/shopPackage";
import {KeycloakAuthService} from "../../services/keycloak-auth.service";
import {RedeemGiftCardComponent} from "../../components/redeem-gift-card/redeem-gift-card.component";
import {LoadingSpinnerComponent} from "../../components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ShopPackageComponent,
    BuyConfirmationModalComponent,
    RedeemGiftCardComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  protected selectedPackage: ShopPackage | null = null;
  public isAuthenticated: boolean = false;

  constructor(protected packageService: ShopPackageService, private keycloakService: KeycloakAuthService,) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.keycloakService.isAuthenticated();
    }

  handlePackageClick($event: ShopPackage) {
    this.selectedPackage = $event;
  }

  handleModalClose() {
    this.selectedPackage = null;
  }
}
