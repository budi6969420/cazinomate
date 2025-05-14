import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DecimalPipe, NgClass} from "@angular/common";
import {PayoutItemModel} from "../../models/payoutItemModel";

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

  ShowConfirmationModal() {
    this.payoutItemClicked.emit(this.payoutItem);
  }

  tiles: any[] = [];

  ngOnInit() {
    const cols = 8;
    const rows = 14;
    this.tiles = new Array(cols * rows);
  }

  getCardClass() : string {
    if (!this.isAuthenticated) {
      return 'card';
    }
    return 'card active';
  }
}
