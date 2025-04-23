import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentLinkCreationOptionsModel} from "../../models/PaymentLinkCreationOptions";
import {PackageService} from "../../services/package.service";
import {Package} from "../../models/package";

@Component({
  selector: 'app-buy-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './buy-confirmation-modal.component.html',
  styleUrl: './buy-confirmation-modal.component.scss'
})
export class BuyConfirmationModalComponent {

  @Input() product: Package | null = null;
  @Output() confirmationClosed = new EventEmitter();

  constructor(private packageService: PackageService) {
  }

  public handleYes() {
    if (!this.product) return;
    this.confirmationClosed.emit();
    let paymentLinkOptions = new PaymentLinkCreationOptionsModel();
    paymentLinkOptions.successUrl = location.origin + "/shop";
    paymentLinkOptions.cancelUrl = location.origin + "/shop";

    this.packageService.getPaymentLink(this.product.productId, paymentLinkOptions).subscribe((data) => {
      location.replace(data.url)
    });
  }

  public handleNo() {
    this.confirmationClosed.emit();
  }
}
