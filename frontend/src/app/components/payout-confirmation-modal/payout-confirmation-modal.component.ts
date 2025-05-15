import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentLinkCreationOptionsModel} from "../../models/PaymentLinkCreationOptions";
import {ShopPackageService} from "../../services/shopPackage.service";
import {ShopPackage} from "../../models/shopPackage";
import {PayoutItemService} from "../../services/payout-item.service";
import {PayoutItemModel} from "../../models/payoutItemModel";
import {PayoutSuccessfulResponseModel} from "../../models/payoutSuccessfulResponseModel";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-payout-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './payout-confirmation-modal.component.html',
  styleUrl: './payout-confirmation-modal.component.scss'
})
export class PayoutConfirmationModalComponent {

  @Input() payoutItem: PayoutItemModel | null = null;
  @Output() confirmationClosed = new EventEmitter();

  public payoutItemResponse: PayoutSuccessfulResponseModel | null = null;

  constructor(private payoutItemService: PayoutItemService, private userService: UserService,) {
  }

  public handleYes() {
    if (!this.payoutItem) return;

    this.payoutItemService.getPaymentLink(this.payoutItem.id).subscribe((data) => {
      this.payoutItemResponse = data;
      this.userService.updateSelfBalance().subscribe();
    });
  }

  public handleNo() {
    this.confirmationClosed.emit();
  }
}
