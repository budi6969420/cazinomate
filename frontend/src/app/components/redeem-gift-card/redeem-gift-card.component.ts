import {Component, Input} from '@angular/core';
import {NgxMaskDirective} from "ngx-mask";
import {FormsModule} from "@angular/forms";
import {GiftCardService} from "../../services/gift-card.service";
import {
  GiftCardConfirmationModalComponent
} from "../gift-card-confirmation-modal/gift-card-confirmation-modal.component";
import {UserService} from "../../services/user.service";

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
  amount = 0;
  errorMessage: string = "";

  letterMask = {
    L: { pattern: new RegExp('[a-zA-Z]') }
  };

  constructor(private giftCardService: GiftCardService, private userService: UserService) {
  }

  redeemCode() {
    console.log("Code: " + this.code);
    this.giftCardService.redeemGiftCard(this.code).subscribe({
      next: (giftCardInfo) => {
        if (giftCardInfo != null) {
          this.successfullyRedeemed = true;
          this.code = "";
          this.amount = giftCardInfo.amount;
          this.errorMessage = "";
          this.userService.updateSelfBalance().subscribe();
        }
      },
      error: (error) => {
        this.errorMessage = "Ungültiger Code";
      }
    });
  }

  handleModalClose() {
    this.successfullyRedeemed = false;
  }

  protected readonly RegExp = RegExp;
}
