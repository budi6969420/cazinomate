import {Component, Input} from '@angular/core';
import {NgxMaskDirective} from "ngx-mask";
import {FormsModule} from "@angular/forms";
import {GiftCardService} from "../../services/gift-card.service";
import {
  GiftCardConfirmationModalComponent
} from "../gift-card-confirmation-modal/gift-card-confirmation-modal.component";

@Component({
  selector: 'app-redeem-gift-card',
  imports: [
    NgxMaskDirective,
    FormsModule,
    GiftCardConfirmationModalComponent
  ],
  templateUrl: './redeem-gift-card.component.html',
  styleUrl: './redeem-gift-card.component.scss'
})
export class RedeemGiftCardComponent {

  @Input() isAuthenticated: boolean = false;
  code: string = "";
  successfullyRedeemed: boolean = false;

  constructor(private giftCardService: GiftCardService) {
  }

  redeemCode()
  {
    let response = this.giftCardService.redeemGiftCard(this.code);
    if (response != null) {
      response.subscribe((giftCardInfo) => {
        if (giftCardInfo != null) {
          this.successfullyRedeemed = true;
          this.code = "";
        }
      });
    }
    else {

    }
  }

  handleModalClose() {
    this.successfullyRedeemed = false;
  }
}
