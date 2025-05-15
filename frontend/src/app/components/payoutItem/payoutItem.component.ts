import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DecimalPipe, NgClass} from "@angular/common";
import {PayoutItemModel} from "../../models/payoutItemModel";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-payoutItem',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './payoutItem.component.html',
  styleUrl: './payoutItem.component.scss'
})
export class PayoutItemComponent implements OnInit {
  @Input() payoutItem!: PayoutItemModel;
  @Input() isAuthenticated: boolean = false;
  @Output() payoutItemClicked = new EventEmitter<PayoutItemModel>();

  constructor(private userService: UserService) {
  }

  ShowConfirmationModal() {
    if (!this.canAfford()) {
      this.shakeCard();
      return;
    }
    this.payoutItemClicked.emit(this.payoutItem);
  }

  tiles: any[] = [];

  isShaking = false;

  canAfford(): boolean {
    return this.userService.myBalance >= this.payoutItem.cost;
  }

  shakeCard() {
    this.isShaking = true;
    setTimeout(() => {
      this.isShaking = false;
    }, 500); // Duration of shake animation
  }


  ngOnInit() {
    const cols = 8;
    const rows = 14;
    this.tiles = new Array(cols * rows);
  }

  getCardClass() : any {
    return {
      'card': true,
      'active': this.isAuthenticated && this.canAfford(),
      'unaffordable': this.isAuthenticated && !this.canAfford(),
      'shake': this.isShaking
    };
  }
}
