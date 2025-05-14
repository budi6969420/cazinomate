import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentLinkCreationOptionsModel} from "../../models/PaymentLinkCreationOptions";
import {ShopPackageService} from "../../services/shopPackage.service";
import {ShopPackage} from "../../models/shopPackage";

@Component({
  selector: 'app-buy-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './buy-confirmation-modal.component.html',
  styleUrl: './buy-confirmation-modal.component.scss'
})
export class BuyConfirmationModalComponent {

  @Input() product: ShopPackage | null = null;
  @Output() confirmationClosed = new EventEmitter();

  constructor(private packageService: ShopPackageService) {
  }

  public handleYes() {
    if (!this.product) return;
    this.confirmationClosed.emit();
    let paymentLinkOptions = new PaymentLinkCreationOptionsModel();
    paymentLinkOptions.successUrl = location.origin + "/order-confirmation";
    paymentLinkOptions.cancelUrl = location.origin + "/shop";

    this.packageService.getPaymentLink(this.product.productId, paymentLinkOptions).subscribe((data) => {
      location.replace(data.url)
    });
  }

  public handleNo() {
    this.confirmationClosed.emit();
  }
}
