import {Component, OnInit} from '@angular/core';
import {ShopPackageComponent} from "../../components/shopPackage/shopPackage.component";
import {ShopPackageService} from "../../services/shopPackage.service";
import {BuyConfirmationModalComponent} from "../../components/buy-confirmation-modal/buy-confirmation-modal.component";
import {ShopPackage} from "../../models/shopPackage";
import {KeycloakAuthService} from "../../services/keycloak-auth.service";
import {PayoutItemComponent} from "../../components/payoutItem/payoutItem.component";
import {PayoutItemModel} from "../../models/payoutItemModel";
import {PayoutItemService} from "../../services/payout-item.service";
import {
  PayoutConfirmationModalComponent
} from "../../components/payout-confirmation-modal/payout-confirmation-modal.component";

@Component({
  selector: 'app-payout',
  standalone: true,
  imports: [
    PayoutItemComponent,
    PayoutConfirmationModalComponent,
  ],
  templateUrl: './payout.component.html',
  styleUrl: './payout.component.scss',
})
export class PayoutComponent {
  protected payoutItem: PayoutItemModel | null = null;

  constructor(protected payoutItemService: PayoutItemService, protected keycloakService: KeycloakAuthService,) {
  }


  handlePackageClick($event: PayoutItemModel) {
    this.payoutItem = $event;
  }

  handleModalClose() {
    this.payoutItem = null;
  }
}
