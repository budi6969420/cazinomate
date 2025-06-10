import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentLinkCreationOptionsModel} from "../../models/PaymentLinkCreationOptions";
import {ShopPackageService} from "../../services/shopPackage.service";
import {ShopPackage} from "../../models/shopPackage";
import {DecimalPipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-buy-confirmation-modal',
  standalone: true,
  imports: [
    DecimalPipe,
    LoadingSpinnerComponent
  ],
  templateUrl: './buy-confirmation-modal.component.html',
  styleUrl: './buy-confirmation-modal.component.scss'
})
export class BuyConfirmationModalComponent {

  @Input() product!: ShopPackage;
  @Output() confirmationClosed = new EventEmitter();

  isLaunchingLink = false;

  constructor(private packageService: ShopPackageService) {
  }

  public handleYes() {
    if (!this.product) return;
    this.isLaunchingLink = true;

    let paymentLinkOptions = new PaymentLinkCreationOptionsModel();
    paymentLinkOptions.successUrl = location.origin + "/order-confirmation";
    paymentLinkOptions.cancelUrl = location.origin + "/shop";

    this.packageService.getPaymentLink(this.product.productId, paymentLinkOptions).subscribe((data) => {
      location.replace(data.url);
      this.isLaunchingLink = false;
      this.confirmationClosed.emit();
    });
  }

  public handleNo() {
    this.confirmationClosed.emit();
  }
}
