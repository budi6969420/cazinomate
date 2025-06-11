import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-gift-card-confirmation-modal',
    imports: [],
  templateUrl: './gift-card-confirmation-modal.component.html',
  styleUrl: './gift-card-confirmation-modal.component.scss'
})
export class GiftCardConfirmationModalComponent {
  @Input() redeemed = false;
  @Input() amount: number = 0;
  @Output() confirmationClosed = new EventEmitter();

  handleOk(){
    this.confirmationClosed.emit();
  }
}
